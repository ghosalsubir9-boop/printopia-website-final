import { getImage } from "../utils/image";

export const images = {
  logo: getImage("LOGO.webp"),

  hero: {
    reportPad: getImage("report-pad.webp"),
    labEnvelope: getImage("lab-envelope.webp"),
    opdFile: getImage("opd-file.webp"),
    hospitalBag: getImage("hospital-bags.webp"),
  },

  products: {
    reportPad: getImage("report-pad.webp"),
    labEnvelope: getImage("lab-envelope.webp"),
    opdFile: getImage("opd-file.webp"),
    patientBands: getImage("patient-identification-bands.webp"),
    billBook: getImage("bill-book.webp"),
    xrayEnvelope: getImage("xray-envelope.webp"),
    testReportFile: getImage("test-report-file.webp"),
    hospitalBags: getImage("hospital-bags.webp"),
    idCard: getImage("id-card.webp"),
    visitingCard: getImage("visiting-card.webp"),
    stickerLabel: getImage("Sticker.webp"),
    brochure: getImage("brochure.webp"),
    flyers: getImage("flyers.webp"),
  },

  about: {
    customerCare: getImage("coustomer-excutive.webp"),
    creativeTeam: getImage("creative-team.webp"),
    printingMachine: getImage("printing-machine.webp"),
    productionProcess: getImage("production-process.webp"),
  },
};

export type ImageMapping = typeof images;
