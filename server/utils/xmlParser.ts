import { parseString } from "xml2js";

interface ParsedXML {
  INProfileResponse?: {
    CreditProfileHeader?: [{
      ReportDate?: [string];
      ReportNumber?: [string];
    }];
    Current_Application?: [{
      Current_Application_Details?: [{
        Current_Applicant_Details?: [{
          First_Name?: [string];
          Last_Name?: [string];
          Middle_Name1?: [string];
          MobilePhoneNumber?: [string];
          IncomeTaxPan?: [string];
        }];
      }];
    }];
    SCORE?: [{
      BureauScore?: [string];
    }];
    CAIS_Account?: [{
      CAIS_Summary?: [{
        Credit_Account?: [{
          CreditAccountTotal?: [string];
          CreditAccountActive?: [string];
          CreditAccountClosed?: [string];
        }];
        Total_Outstanding_Balance?: [{
          Outstanding_Balance_Secured?: [string];
          Outstanding_Balance_UnSecured?: [string];
          Outstanding_Balance_All?: [string];
        }];
      }];
      CAIS_Account_DETAILS?: Array<{
        Subscriber_Name?: [string];
        Account_Number?: [string];
        Account_Type?: [string];
        Current_Balance?: [string];
        Amount_Overdue?: [string];
        Credit_Limit_Amount?: [string];
        Account_Status?: [string];
        CAIS_Account_History?: [{
          CAIS_Holder_Details?: Array<{
            First_Name?: [string];
            Last_Name?: [string];
            Address_Line1?: [string];
            Address_Line2?: [string];
            Address_Line3?: [string];
            Address_Line4?: [string];
            Address_Line5?: [string];
            City?: [string];
            State?: [string];
            Postal_PIN_code?: [string];
          }>;
        }];
      }>;
    }];
    CAPS?: [{
      CAPS_Summary?: [{
        CAPSLast7Days?: [string];
      }];
    }];
  };
}

const getAccountTypeName = (code: string): string => {
  const types: Record<string, string> = {
    "00": "Auto Loan",
    "01": "Housing Loan",
    "02": "Property Loan",
    "03": "Loan Against Shares/Securities",
    "04": "Personal Loan",
    "05": "Consumer Loan",
    "06": "Gold Loan",
    "07": "Education Loan",
    "08": "Loan to Professional",
    "09": "Credit Card",
    "10": "Leasing",
    "11": "Overdraft",
    "12": "Two-wheeler Loan",
    "13": "Non-Funded Credit Facility",
    "14": "Loan Against Bank Deposits",
    "15": "Fleet Card",
    "16": "Commercial Vehicle Loan",
    "17": "Telco - Wireless",
    "18": "Telco - Broadband",
    "19": "Telco - Landline",
    "20": "Seller Financing",
    "31": "Secured Credit Card",
    "32": "Used Car Loan",
    "33": "Construction Equipment Loan",
    "34": "Tractor Loan",
    "35": "Corporate Credit Card",
    "36": "Kisan Credit Card",
    "37": "Loan on Credit Card",
    "38": "Prime Minister Jaan Dhan Yojana - Overdraft",
    "39": "Mudra Loans - Shishu / Kishor / Tarun",
    "40": "Microfinance - Business Loan",
    "41": "Microfinance - Personal Loan",
    "42": "Microfinance - Housing Loan",
    "43": "Microfinance - Others",
    "44": "Pradhan Mantri Awas Yojana - Credit Link Subsidy Scheme MAY CLSS",
    "51": "Business Loan - General",
    "52": "Business Loan - Priority Sector - Small Business",
    "53": "Business Loan - Priority Sector - Agriculture",
    "54": "Business Loan - Priority Sector - Others",
    "55": "Business Non-Funded Credit Facility - General",
    "56": "Business Non-Funded Credit Facility - Priority Sector - Small Business",
    "57": "Business Non-Funded Credit Facility - Priority Sector - Agriculture",
    "58": "Business Non-Funded Credit Facility - Priority Sector - Others",
    "59": "Business Loan Against Bank Deposits",
    "61": "Business Loan - Unsecured",
  };
  return types[code] || `Account Type ${code}`;
};

export async function parseXMLReport(xmlContent: string): Promise<any> {
  return new Promise((resolve, reject) => {
    parseString(xmlContent, { explicitArray: true }, (err, result: ParsedXML) => {
      if (err) {
        reject(new Error("Failed to parse XML file"));
        return;
      }

      try {
        const response = result.INProfileResponse;
        if (!response) {
          reject(new Error("Invalid XML format: Missing INProfileResponse"));
          return;
        }

        const applicantDetails = response.Current_Application?.[0]?.Current_Application_Details?.[0]?.Current_Applicant_Details?.[0];
        const firstName = applicantDetails?.First_Name?.[0] || "";
        const lastName = applicantDetails?.Last_Name?.[0] || "";
        const middleName = applicantDetails?.Middle_Name1?.[0] || "";
        const name = [firstName, middleName, lastName].filter(Boolean).join(" ") || "Unknown";
        const mobilePhone = applicantDetails?.MobilePhoneNumber?.[0] || "";
        const pan = applicantDetails?.IncomeTaxPan?.[0] || "";

        const creditScore = parseInt(response.SCORE?.[0]?.BureauScore?.[0] || "0");

        const caisSummary = response.CAIS_Account?.[0]?.CAIS_Summary?.[0];
        const creditAccount = caisSummary?.Credit_Account?.[0];
        const balances = caisSummary?.Total_Outstanding_Balance?.[0];

        const totalAccounts = parseInt(creditAccount?.CreditAccountTotal?.[0] || "0");
        const activeAccounts = parseInt(creditAccount?.CreditAccountActive?.[0] || "0");
        const closedAccounts = parseInt(creditAccount?.CreditAccountClosed?.[0] || "0");
        const securedAmount = parseInt(balances?.Outstanding_Balance_Secured?.[0] || "0");
        const unsecuredAmount = parseInt(balances?.Outstanding_Balance_UnSecured?.[0] || "0");
        const currentBalance = parseInt(balances?.Outstanding_Balance_All?.[0] || "0");

        const recentEnquiries = parseInt(response.CAPS?.[0]?.CAPS_Summary?.[0]?.CAPSLast7Days?.[0] || "0");

        const accountDetails = response.CAIS_Account?.[0]?.CAIS_Account_DETAILS || [];
        const creditAccounts = accountDetails.map((account) => {
          const holderDetails = account.CAIS_Account_History?.[0]?.CAIS_Holder_Details?.[0];
          const addressParts = [
            holderDetails?.Address_Line1?.[0],
            holderDetails?.Address_Line2?.[0],
            holderDetails?.Address_Line3?.[0],
            holderDetails?.Address_Line4?.[0],
            holderDetails?.Address_Line5?.[0],
            holderDetails?.City?.[0],
            holderDetails?.State?.[0],
            holderDetails?.Postal_PIN_code?.[0],
          ].filter(Boolean);

          return {
            bank: account.Subscriber_Name?.[0]?.trim() || "Unknown Bank",
            accountNumber: account.Account_Number?.[0] || "N/A",
            accountType: getAccountTypeName(account.Account_Type?.[0] || ""),
            address: addressParts.join(", "),
            overdueAmount: parseInt(account.Amount_Overdue?.[0] || "0"),
            currentBalance: parseInt(account.Current_Balance?.[0] || "0"),
            creditLimit: parseInt(account.Credit_Limit_Amount?.[0] || "0") || undefined,
            status: account.Account_Status?.[0] || "Active",
          };
        });

        const reportDate = response.CreditProfileHeader?.[0]?.ReportDate?.[0] || new Date().toISOString().split("T")[0];
        const reportNumber = response.CreditProfileHeader?.[0]?.ReportNumber?.[0] || `${Date.now()}`;

        resolve({
          basicDetails: {
            name,
            mobilePhone,
            pan,
            creditScore,
          },
          reportSummary: {
            totalAccounts,
            activeAccounts,
            closedAccounts,
            currentBalance,
            securedAmount,
            unsecuredAmount,
            recentEnquiries,
          },
          creditAccounts,
          reportDate,
          reportNumber,
        });
      } catch (error) {
        reject(new Error("Failed to extract data from XML"));
      }
    });
  });
}
