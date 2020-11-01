 const HBCConverter = {
  KgToLb: function (kg) {
      return kg * 2.2046;
  },
  LbToKg: function (lb) {
      return lb / 2.2046;
  },
  FtoC: function (fahr) {
      return (fahr - 32) / 1.8000;
  },
  CtoF: function (celcius) {
      return (celcius * 1.8000) + 32.00;
  },
  LtoGal: function (liters) {
      return liters * 0.26417;
  },
  GalToL: function (gals) {
      return gals / 0.26417;
  },
  CmToInch: function (cm) {
      return cm * 0.39370;
  },
  InchToCm: function (inch) {
      return inch / 0.39370;
  },
  MtoFt: function (m) {
      return m / 0.3048;
  },
  FtToM: function (ft) {
      return ft * 0.3048;
  },
  FtToMFraction: function (ft) {
      return ft * (1 / 0.3048);
  },
  GToOz: function (grams) {
      return grams * 0.035274;
  },
  OzToG: function (oz) {
      return oz / 0.035274;
  },
  PsiToBar: function (psi) {
      return 0.0689475729 * psi;
  },
  BarToPsi: function (bar) {
      return bar / 0.0689475729;
  }
}

export default HBCConverter;