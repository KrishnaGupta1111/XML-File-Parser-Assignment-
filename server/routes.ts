import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { connectDB } from "./db";
import { CreditReport } from "./models/creditReport";
import { parseXMLReport } from "./utils/xmlParser";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
  fileFilter: (req, file, cb) => {
    if (file.originalname.toLowerCase().endsWith(".xml")) {
      cb(null, true);
    } else {
      cb(new Error("Only XML files are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  await connectDB();

  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const xmlContent = req.file.buffer.toString("utf-8");
      const parsedData = await parseXMLReport(xmlContent);

      const report = new CreditReport(parsedData);
      await report.save();

      res.json({
        message: "File uploaded and processed successfully",
        reportId: report._id,
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      res.status(500).json({
        message: error.message || "Failed to process XML file",
      });
    }
  });

  app.get("/api/reports", async (req, res) => {
    try {
      const reports = await CreditReport.find()
        .sort({ createdAt: -1 })
        .lean();

      const formattedReports = reports.map((report) => ({
        ...report,
        id: report._id.toString(),
        _id: undefined,
      }));

      res.json(formattedReports);
    } catch (error: any) {
      console.error("Get reports error:", error);
      res.status(500).json({
        message: "Failed to retrieve reports",
      });
    }
  });

  app.get("/api/reports/:id", async (req, res) => {
    try {
      const report = await CreditReport.findById(req.params.id).lean();

      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }

      const formattedReport = {
        ...report,
        id: report._id.toString(),
        _id: undefined,
      };

      res.json(formattedReport);
    } catch (error: any) {
      console.error("Get report error:", error);
      res.status(500).json({
        message: "Failed to retrieve report",
      });
    }
  });

  app.use((err: any, req: any, res: any, next: any) => {
    console.error("Server error:", err);
    res.status(err.status || 500).json({
      message: err.message || "Internal server error",
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
