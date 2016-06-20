/*
* ----------------------------------------------------------------------------
* "THE BEER-WARE LICENSE" (Revision 42):
* post at eirikh no wrote this file.  As long as you retain this notice you
* can do whatever you want with this stuff. If we meet some day, and you think
* this stuff is worth it, you can buy me a beer in return.   Eirik H
* ----------------------------------------------------------------------------
*/

$().ready(function () {

    // sidebar nav click
    $('.nav-sidebar a').on("click", function () {
        if ($('.navbar-toggle').is(':visible')) {
            $('.sidebar').collapse('toggle');
        }
    });

    // add unit switch to each calc
    $('.hbcAnchor .panel-heading').each(function(index) {
      $(this).append('<div class="pull-right"><button type="button" class="btn btn-success btn-xs hbcUnitBtn hbcMetricBtn">Metric</button> <button type="button" class="btn btn-primary btn-xs hbcUnitBtn hbcUSBtn">US</button></div>');
    });

    // on unit switch btn click
    $('.hbcUnitBtn').on("click", function () {
        // figure out if we have switched units now
        var hasSwitched = false;
        if($(this).hasClass('hbcMetricBtn')) {
          hasSwitched = !isMetric();
        } else {
          hasSwitched = isMetric();
        }

        // reset
        $('.hbcUnitBtn.btn-lg').removeClass("btn-success").removeClass("btn-default").addClass("btn-default");
        $('.hbcUnitBtn.btn-xs').removeClass("btn-success").removeClass("btn-primary").addClass("btn-primary");

        // set selected style
        if($(this).hasClass('hbcMetricBtn')) {
          $('.hbcMetricBtn').removeClass("btn-default").addClass("btn-success");
        } else {
          $('.hbcUSBtn').removeClass("btn-default").addClass("btn-success");
        }

        // reset all calc values
        setNAOutputValue($('.hbcResult'));

        // WEIGHT (kilo)
        var unitName = 'kg';
        var placeholderName = '0 ' + unitName;

        if(!isMetric()) {
          unitName = 'lb';
          placeholderName = '0 lbs';
        }

        $('.hbcWeightAddon.hbcKiloAddon').each(function(index) {
          var $this = $(this);
          $this.text(unitName);
          $this.parent().find('.form-control').attr('placeholder',placeholderName);
        });

        $('.hbcKiloUnitName').text(unitName);

        // convert:
        if(hasSwitched) {
          $('.hbcKiloInput').each(function(index) {
              var $val = $(this).val();
              if ($val) {
                if(isMetric()) {
                  $(this).val(Math.round(HBCConverter.LbToKg($val) * 100) / 100);
                } else {
                  $(this).val(Math.round(HBCConverter.KgToLb($val) * 100) / 100);
                }
              }
            });
        }

        // WEIGHT (gram)
        var unitName =  isMetric() ? 'g' : 'oz';
        var placeholderName = '0 ' + unitName;

        $('.hbcWeightAddon.hbcGramAddon').each(function(index) {
          var $this = $(this);
          $this.text(unitName);
          $this.parent().find('.form-control').attr('placeholder',placeholderName);
        });

        $('.hbcGramUnitName').text(unitName);

        // convert:
        if(hasSwitched) {
          $('.hbcGramInput').each(function(index) {
              var $val = $(this).val();
              if ($val) {
                if(isMetric()) {
                  $(this).val(Math.round(HBCConverter.OzToG($val) * 100) / 100);
                } else {
                  $(this).val(Math.round(HBCConverter.GToOz($val) * 100) / 100);
                }
              }
            });
        }

        // TEMP
        unitName = isMetric() ? '°C' : '°F';
        placeholderName = '0 ' + unitName;

        $('.hbcTempAddon').each(function(index) {
          var $this = $(this);
          $this.text(unitName);
          $this.parent().find('.form-control').attr('placeholder',placeholderName);
        });

        $('.hbcTempUnitName').text(unitName);

        // convert:
        if(hasSwitched) {
          $('.hbcTempInput').each(function(index) {
              var $val = $(this).val();
              if ($val || $val === 0) {
                if(isMetric()) {
                  $(this).val(Math.round(HBCConverter.FtoC($val) * 100) / 100);
                } else {
                  $(this).val(Math.round(HBCConverter.CtoF($val) * 100) / 100);
                }
              }
            });
        }

        // VOLUME (liters)
        unitName = isMetric()? 'L' : 'gal.';
        placeholderName = '0 ' + unitName;

        $('.hbcVolumeAddon').each(function(index) {
          var $this = $(this);
          $this.text(unitName);
          $this.parent().find('.form-control').attr('placeholder',placeholderName);
        });

        $('.hbcVolumeUnitName').text(unitName);

        // convert:
        if(hasSwitched) {
          $('.hbcVolumeInput').each(function(index) {
              var $val = $(this).val();
              if ($val) {
                if(isMetric()) {
                  $(this).val(Math.round(HBCConverter.GalToL($val) * 100) / 100);
                } else {
                  $(this).val(Math.round(HBCConverter.LtoGal($val) * 100) / 100);
                }
              }
            });
        }

        // LENGTH (CM)

        unitName = isMetric() ? 'cm' : 'in';
        placeholderName = '0 ' + unitName;

        $('.hbcLengthAddon').each(function(index) {
          var $this = $(this);
          $this.text(unitName);
          $this.parent().find('.form-control').attr('placeholder',placeholderName);
        });

        $('.hbcLengthCMUnitName').text(unitName);

        // convert:
        if(hasSwitched) {
          $('.hbcLengthCMInput').each(function(index) {
              var $val = $(this).val();
              if ($val) {
                if(isMetric()) {
                  $(this).val(Math.round(HBCConverter.InchToCm($val) * 100) / 100);
                } else {
                  $(this).val(Math.round(HBCConverter.CmToInch($val) * 100) / 100);
                }
              }
            });
        }

        // kg/liter (not used I believe)

        unitName = isMetric() ? 'kg/liter' : 'lbs/gal.';
        placeholderName = '0 ' + unitName;
        $('.hbcKiloLiterRatio').each(function(index) {
          var $this = $(this);
          $this.parent().find('.form-control').attr('placeholder',placeholderName);
        });

        // liter/kg

        unitName = isMetric() ? 'L/kg' : 'qt/lbs.';
        placeholderName = '0 ' + unitName;
        $('.hbcLiterKiloRatio').each(function(index) {
          var $this = $(this);
          $this.text(unitName);
          $this.parent().find('.form-control').attr('placeholder',placeholderName);
        });
    });

    var events = 'change keypress paste focus textInput input'; // change events that trigger recalc, there are probably too many here, but what the heck, cpu is cheap these days, even in js

    // Strike Temperature
    var stChangeHandler = function () { st(); }
    $('#STGrainWeightInput,#STGrainTempInput,#STMashVolumeInput,#STMashTempInput').on(events,stChangeHandler);
    $('#STCalcBtn').click(getRecalcTimeoutFunc('#STCalcValue',stChangeHandler));

    // Mash infusion
    var miChangeHandler = function () { mi(); }
    $('#MIGrainWeightInput,#MIWaterVolumeInput,#MICurrentTempInput,#MITargetTempInput,#MIWaterTempInput').on(events,miChangeHandler);
    $('#MICalcBtn').click(getRecalcTimeoutFunc('#MICalcValue',miChangeHandler));

    // Water Heating
    var whChangeHandler = function () { wh(); }
    $('#WHInitialTempInput,#WHDesiredTempInput,#WHVolumeInput,#WHPowerInput').on(events,whChangeHandler);
    $('#WHCalcBtn').click(getRecalcTimeoutFunc('#WHCalcValue',whChangeHandler));

    // Dilution (water)
    var dlwChangeHandler = function () { dlw(); }
    $('#DLWInitialGravityInput,#DLWDesiredGravityInput,#DLWVolumeInput').on(events,dlwChangeHandler);
    $('#DLWCalcBtn').click(getRecalcTimeoutFunc('#DLWCalcValue',dlwChangeHandler));

    // Dilution (gravity)
    var dlgChangeHandler = function () { dlg(); }
    $('#DLGInitialGravityInput,#DLGInitVolumeInput,#DLGTargetVolumeInput').on(events, dlgChangeHandler);
    $('#DLGCalcBtn').click(getRecalcTimeoutFunc('#DLGCalcValue',dlgChangeHandler));

    // Alpha Acid
    var haChangeHandler = function () { ha(); }
    $('#HAHopsWeightInput,#HAHopsAlphaInput,#HAHopsActualAlphaInput').on(events, haChangeHandler);
    $('#HACalcBtn').click(getRecalcTimeoutFunc('#HACalcValue',haChangeHandler));

    // Hops Storage
    var hsChangeHandler = function () { hs(); }
    $('#HSInitAlphaInput,#HSSixMonthLossSelect,#HSStorageTempInput,#HSStorageConditionsSelect,#HSHopsAge').on(events, hsChangeHandler);
    $('#HSCalcBtn').click(getRecalcTimeoutFunc('#HSCalcValue',hsChangeHandler));

    // Mash Size
    var msChangeHandler = function () { ms(); }
    $('#MSGrainWeightInput,#MSMashTicknessInput').on(events, msChangeHandler);
    $('#MSCalcBtn').click(getRecalcTimeoutFunc('#MSCalcValue',msChangeHandler));

    // Refractometer alcohol adj. (gravity version)
    var ragChangeHandler = function () { rag(); }
    $('#RAGSGInput,#RAGOGInput,#RAWortFactorInput').on(events, ragChangeHandler);
    $('#RAGCalcBtn').click(getRecalcTimeoutFunc('#RAGCalcValue,#RAGAlcCalcValue',ragChangeHandler));

    // Refractometer alcohol adj. (brix version)
    var rabChangeHandler = function () { rab(); }
    $('#RABSGInput,#RABOGInput,#RAWortFactorInput').on(events, rabChangeHandler);
    $('#RABCalcBtn').click(getRecalcTimeoutFunc('#RABCalcValue,#RABAlcCalcValue',rabChangeHandler));

    // alcohol calc
    var acgChangeHandler = function () { acg(); }
    $('#ACOGInput,#ACSGInput').on(events, acgChangeHandler);
    $('#ACCalcBtn').click(getRecalcTimeoutFunc('#ACCalcValue',acgChangeHandler));
    var acbChangeHandler = function () { acb(); }
    $('#ACOGBrixInput,#ACSGBrixInput').on(events, acbChangeHandler);

    // priming sugar
    var psChangeHandler = function () { ps(); }
    $('#PSVolumeInput,#PSTempInput,#PSVolumesInput').on(events, psChangeHandler);
    $('#PSCalcBtn').click(getRecalcTimeoutFunc('#PSSugarCalcValue,#PSCornCalcValue,#PSDMECalcValue',psChangeHandler));

    // keg carbonation
    var kcChangeHandler = function () { kc(); }
    $('#KCTempInput,#KCVolumesInput').on(events, kcChangeHandler);
    $('#KCCalcBtn').click(getRecalcTimeoutFunc('#KCCalcValue',kcChangeHandler));

    // Hydrometer temp. adj.
    var htChangeHandler = function () { ht(); }
    $('#HTSGInput,#HTTempInput,#HTCalTempInput').on(events, htChangeHandler);
    $('#HTCalcBtn').click(getRecalcTimeoutFunc('#HTCalcValue',htChangeHandler));

    // Brix to Grav
    var bgBtoGChangeHandler = function () { bgBtoG(); }
    $('#BGBrixInput').on(events, bgBtoGChangeHandler);
    $('#BGBrixToGravityCalcBtn').click(getRecalcTimeoutFunc('#BGBrixToGravityCalcValue',bgBtoGChangeHandler));

    var bgGtoBChangeHandler = function () { bgGtoB(); }
    $('#BGGravityInput').on(events, bgGtoBChangeHandler);
    $('#BGGravityToBrixCalcBtn').click(getRecalcTimeoutFunc('#BGGravityToBrixCalcValue',bgGtoBChangeHandler));

    // tun/kettle size
    var tsvChangeHandler = function () { tsv(); }
    $('#TSVDiameterInput,#TSVHeightInput,#TSDeadSpaceInput').on(events, tsvChangeHandler);
    $('#TSVCalcBtn').click(getRecalcTimeoutFunc('#TSVCalcValue,#TSHeightCalcValue',tsvChangeHandler));

    // color calc
    var ccSRMChangeHandler = function () { ccSRM(); }
    $('#CCSRMInput').on(events, ccSRMChangeHandler);

    var ccLoviChangeHandler = function () { ccLovi(); }
    $('#CCLoviInput').on(events, ccLoviChangeHandler);

    var ccEBCChangeHandler = function () { ccEBC(); }
    $('#CCEBCInput').on(events, ccEBCChangeHandler);
});

function ccSRM() {
  var $srmEl = $('#CCSRMInput');
  var $loviEl = $('#CCLoviInput');
  var $ebcEl = $('#CCEBCInput');

  var srm = getGenericNumberVal($srmEl);

  if(srm) {
      var lovi = (srm + 0.76) / 1.3546;
      var ebc = srm * 1.97;
      setInputValue($loviEl,Math.round(lovi*100)/100);
      setInputValue($ebcEl,Math.round(ebc*100)/100);
  }
}

function ccLovi() {
  var $srmEl = $('#CCSRMInput');
  var $loviEl = $('#CCLoviInput');
  var $ebcEl = $('#CCEBCInput');

  var lovi = getGenericNumberVal($loviEl);

  if(lovi) {
      var srm = (1.3546 * lovi) - 0.76;
      var ebc = srm * 1.97;
      setInputValue($srmEl,Math.round(srm*100)/100);
      setInputValue($ebcEl,Math.round(ebc*100)/100);
  }
}

function ccEBC() {
  var $srmEl = $('#CCSRMInput');
  var $loviEl = $('#CCLoviInput');
  var $ebcEl = $('#CCEBCInput');

  var ebc = getGenericNumberVal($ebcEl);

  if(ebc) {
      var srm = ebc * 0.508;
      var lovi = (srm + 0.76) / 1.3546;
      setInputValue($srmEl,Math.round(srm*100)/100);
      setInputValue($loviEl,Math.round(lovi*100)/100);
  }
}

function ms() { // mash size
    var grainWeight = getGenericNumberVal($('#MSGrainWeightInput'));
    var mashTickness = getGenericNumberVal($('#MSMashTicknessInput'));

    $msVal = $('#MSCalcValue');

    if (grainWeight && mashTickness) {
        var totalSize = 0;
        if(isMetric()) {
          totalSize = grainWeight * (.67 + mashTickness);
        } else {
          totalSize = grainWeight * (.08 + mashTickness/4);
        }

        setOKOutputValue($msVal,Math.round(totalSize * 100) / 100)
    } else {
        setNAOutputValue($msVal);
    }
}

function mi() { // mash infusion
    var grainWeight = getWeight($('#MIGrainWeightInput'));
    var waterVolume = getVolume($('#MIWaterVolumeInput'));
    var addWaterTemp = getTemp($('#MIWaterTempInput'));
    var currentTemp = getTemp($('#MICurrentTempInput'));
    var targetTemp = getTemp($('#MITargetTempInput'));

    $miVal = $('#MICalcValue');

    if (grainWeight && waterVolume && addWaterTemp && currentTemp && targetTemp) {
        var addWaterVolume = (targetTemp - currentTemp) * ((.41 * grainWeight) + waterVolume) / (addWaterTemp - targetTemp);
        if(!isMetric()) {
          addWaterVolume = HBCConverter.LtoGal(addWaterVolume);
        }
        setOKOutputValue($miVal,Math.round(addWaterVolume * 100) / 100)
    } else {
        setNAOutputValue($miVal);
    }
}

function tsv() { // tun size volume
    var tunRadius = (getLength($('#TSVDiameterInput')) || 0) / 2;
    var tunHeight = getLength($('#TSVHeightInput'));
    var adj = getPercent($('#TSDeadSpaceInput')) || 0;

    $tsVal = $('#TSVCalcValue');
    $tsHeightVal = $('#TSHeightCalcValue');

    if (tunRadius && tunHeight) {
        var totalVolume = (1 - adj) * (3.1415 * Math.pow(tunRadius,2) * tunHeight) / 1000;
        var heightPerUnit = 0;
        if(isMetric()) {
          heightPerUnit = tunHeight / totalVolume;
        } else {
          totalVolume = HBCConverter.LtoGal(totalVolume);
          heightPerUnit = HBCConverter.CmToInch(tunHeight) / totalVolume;
        }
        setOKOutputValue($tsVal,Math.round(totalVolume * 100) / 100);
        setOKOutputValue($tsHeightVal,Math.round(heightPerUnit * 100) / 100);
    } else {
        setNAOutputValue($tsVal);
        setNAOutputValue($tsHeightVal);
    }
}

function hs() { // hops storage

    var hopsAlpha = getPercent($('#HSInitAlphaInput'));
    var hopsLoss = getGenericNumberVal($('#HSSixMonthLossSelect'));
    var storageTemp = getTemp($('#HSStorageTempInput'));
    var storageCond = getGenericNumberVal($('#HSStorageConditionsSelect'));
    var hopsAge = getGenericNumberVal($('#HSHopsAge'));

    var $hsVal = $('#HSCalcValue');

    if (hopsAlpha && hopsLoss && storageTemp && storageCond && hopsAge) {
        var hopsLoss = hopsLoss / 100;
        var Kfactor = 0.0071473518 * hopsLoss * hopsLoss * hopsLoss - 0.00051989349 * hopsLoss * hopsLoss + 0.006273602 * hopsLoss - 0.000048481808;
        var TFfactor = 0.381996277 * Math.exp(0.04956630357 * storageTemp);
        var AAadj = (hopsAlpha * 100) * (1 / (Math.exp(Kfactor * storageCond * TFfactor * hopsAge)));

        setOKOutputValue($hsVal,Math.round(AAadj * 100) / 100)
    } else {
        setNAOutputValue($hsVal);
    }

}

function acg(disableBrixSet) {
    if (disableBrixSet === undefined)
      disableBrixSet = false;

    var og = getGenericNumberVal($('#ACOGInput'));
    var sg = getGenericNumberVal($('#ACSGInput'));

    $acgVal = $('#ACCalcValue');
    $acbOGEl = $('#ACOGBrixInput');
    $acbSGEl = $('#ACSGBrixInput');

    if (!disableBrixSet && og)
      setInputValue($acbOGEl,Math.round(convertGravityToBrix(og)*100)/100);
    if (!disableBrixSet && sg)
      setInputValue($acbSGEl,Math.round(convertGravityToBrix(sg)*100)/100);

    if (sg && og) {
        var abv = getAlcohol(sg,og);
        setOKOutputValue($acgVal,Math.round(abv * 100) / 100)
    } else {
        setNAOutputValue($acgVal);
    }
}

function acb() {
    var ogBrix = getGenericNumberVal($('#ACOGBrixInput'));
    var sgBrix = getGenericNumberVal($('#ACSGBrixInput'));

    $acgOGEl = $('#ACOGInput');
    $acgSGEl = $('#ACSGInput');

    if (ogBrix)
      setInputValue($acgOGEl,Math.round(convertBrixToGravity(ogBrix)*1000)/1000);
    if (sgBrix)
      setInputValue($acgSGEl,Math.round(convertBrixToGravity(sgBrix)*1000)/1000);

  acg(true); // call the gravity version, disable write back to brix
}

function ps() { // priming sugar
    var beerVol = getVolume($('#PSVolumeInput'));
    var beerTemp = getTemp($('#PSTempInput'));
    var wantedCO2 = getGenericNumberVal($('#PSVolumesInput')) || 0;

    $psResidualCO2 = $('#PSBeerCO2CalcValue');
    $psSugarVal = $('#PSSugarCalcValue');
    $psCornVal = $('#PSCornCalcValue');
    $psDMEVal = $('#PSDMECalcValue');

    if((beerTemp || beerTemp == 0)) {
      var beerCO2 = 3.0378 - (0.050062 * HBCConverter.CtoF(beerTemp)) + (0.00026555 * Math.pow(HBCConverter.CtoF(beerTemp),2));
      setOKOutputValue($psResidualCO2,Math.round(beerCO2 * 100) / 100);
      if (beerVol && wantedCO2) {
          var sugarWeight = (wantedCO2-beerCO2)*beerVol/0.25;
          var cornWeight = sugarWeight/0.91;
          var dmeWeight = sugarWeight/(0.82 * 0.80);
          if(!isMetric()) {
            sugarWeight = HBCConverter.GToOz(sugarWeight);
            cornWeight = HBCConverter.GToOz(cornWeight);
            dmeWeight = HBCConverter.GToOz(dmeWeight);
          }
          setOKOutputValue($psSugarVal,Math.round(sugarWeight * 10) / 10);
          setOKOutputValue($psCornVal,Math.round(cornWeight * 10) / 10);
          setOKOutputValue($psDMEVal,Math.round(dmeWeight * 10) / 10);
      } else {
        setNAOutputValue($psSugarVal);
        setNAOutputValue($psCornVal);
        setNAOutputValue($psDMEVal);
      }

    } else {
      setNAOutputValue($psResidualCO2);
      setNAOutputValue($psSugarVal);
      setNAOutputValue($psCornVal);
      setNAOutputValue($psDMEVal);

    }

}

function kc() { // keg carbonation
    var kegTemp = getTemp($('#KCTempInput'));
    var wantedCO2 = getGenericNumberVal($('#KCVolumesInput')) || 0;

    $kcVal = $('#KCCalcValue');
    $kcBarVal = $('#KCBarCalcValue');

    if((kegTemp || kegTemp == 0) && wantedCO2) {
      kegTempFahrenheit = HBCConverter.CtoF(kegTemp); // I didn't convert this formula to use Celcius so just convert the temp to Fahrenheit first
      var kegPressure = -16.6999 - 0.0101059 * kegTempFahrenheit + 0.00116512 * Math.pow(kegTempFahrenheit,2) + 0.173354 * kegTempFahrenheit * wantedCO2 + 4.24267 * wantedCO2 - 0.0684226 * Math.pow(wantedCO2,2);
      setOKOutputValue($kcVal,Math.round(kegPressure * 10) / 10);
      setOKOutputValue($kcBarVal,Math.round(HBCConverter.PsiToBar(kegPressure) * 100) / 100);
    } else {
      setNAOutputValue($kcVal);
      setNAOutputValue($kcBarVal);
    }
}

function ht() { // hydrometer temp.
    var sg = getGenericNumberVal($('#HTSGInput'));
    var temp = getTemp($('#HTTempInput'));
    var calTemp = getTemp($('#HTCalTempInput')) || 0;

    $htVal = $('#HTCalcValue');

    if (sg && temp && calTemp) {
        var corrSG = sg*((1.00130346-0.000134722124*((temp* 9/5)+32)+0.00000204052596*Math.pow((temp* 9/5)+32,2)-0.00000000232820948*Math.pow((temp* 9/5)+32,3))/(1.00130346-0.000134722124*((calTemp* 9/5)+32)+0.00000204052596*Math.pow((calTemp* 9/5)+32,2)-0.00000000232820948*Math.pow((calTemp* 9/5)+32,3)));

        setOKOutputValue($htVal,Math.round(corrSG * 1000) / 1000);
    } else {
        setNAOutputValue($htVal);
    }
}

function ha() { // hops alpha acid
    var hopsWeight = getWeight($('#HAHopsWeightInput'));
    var hopsAlpha = getPercent($('#HAHopsAlphaInput'));
    var hopsActualAlpha = getPercent($('#HAHopsActualAlphaInput'));

    var $haVal = $('#HACalcValue');

    if(hopsWeight && hopsAlpha && hopsActualAlpha) {
        var hopsActualWeight = (hopsWeight * hopsAlpha) / hopsActualAlpha;
        if(!isMetric()) {
          hopsActualWeight = HBCConverter.GToOz(hopsActualWeight);
        }
        setOKOutputValue($haVal,Math.round(hopsActualWeight * 10) / 10);
    } else {
        setNAOutputValue($haVal);
    }

}

function st() { // strike temp
    var grainWeight = getWeight($('#STGrainWeightInput'));
    var grainTemp = getTemp($('#STGrainTempInput'));
    var mashVolume = getVolume($('#STMashVolumeInput'));
    var mashTemp = getTemp($('#STMashTempInput'));

    $stVal = $('#STCalcValue');

    if (grainWeight && grainTemp && mashVolume && mashTemp) {
        var strikeTemp = 0.0;
        strikeTemp = (mashTemp * (mashVolume + (0.41 * grainWeight)) - (0.41 * grainWeight * grainTemp)) / mashVolume;
        if(!isMetric()) {
          strikeTemp = HBCConverter.CtoF(strikeTemp);
        }

        setOKOutputValue($stVal,Math.round(strikeTemp * 10) / 10);
    } else {
        setNAOutputValue($stVal);
    }

}

function wh() {
    var initTemp = getTemp($('#WHInitialTempInput'));
    var desiredTemp = getTemp($('#WHDesiredTempInput'));
    var waterVolume = getVolume($('#WHVolumeInput'));
    var power = getGenericNumberVal($('#WHPowerInput'));

    $whVal = $('#WHCalcValue');

    if ((initTemp || initTemp == 0) && desiredTemp && waterVolume && power) {
        var heatingTime = 0.0;
        heatingTime = (4184.0 * waterVolume * (desiredTemp - initTemp)) / power / 60.0;
        setOKOutputValue($whVal,Math.round(heatingTime * 10) / 10);
    } else {
        setNAOutputValue($whVal);
    }

}

function dlw() {
    var initGravity = getGenericNumberVal($('#DLWInitialGravityInput'));
    var desiredGravity = getGenericNumberVal($('#DLWDesiredGravityInput'));
    var wortVolume = getVolume($('#DLWVolumeInput'));

    $dlVal = $('#DLWCalcValue');

    if (initGravity && desiredGravity && wortVolume) {
        initGravity -= 1;
        desiredGravity -= 1;
        var addWater = (initGravity * wortVolume/desiredGravity) - wortVolume;
        if(!isMetric()) {
          addWater = HBCConverter.LtoGal(addWater);
        }
        setOKOutputValue($dlVal,Math.round(addWater * 100) / 100);
    } else {
        setNAOutputValue($dlVal);
    }
}

function dlg() {
    var initGravity = getGenericNumberVal($('#DLGInitialGravityInput'));
    var wortVolume = getVolume($('#DLGInitVolumeInput'));
    var targetWolume = getVolume($('#DLGTargetVolumeInput'));

    $dlgVal = $('#DLGCalcValue');

    if (initGravity && targetWolume && wortVolume) {
        initGravity -= 1;
        var finalGravity = (wortVolume * initGravity / targetWolume) + 1;
        setOKOutputValue($dlgVal,Math.round(finalGravity * 1000) / 1000);
    } else {
        setNAOutputValue($dlgVal);
    }
}

function rag() {
    var sg = getGenericNumberVal($('#RAGSGInput'));
    var og = getGenericNumberVal($('#RAGOGInput'));
    var corrFactor = getGenericNumberVal($('#RAWortFactorInput'));

    $ragVal = $('#RAGCalcValue');
    $ragAlcVal = $('#RAGAlcCalcValue');

    if (sg && og && corrFactor) {
        var sgBrix = convertGravityToBrix(sg);
        var ogBrix = convertGravityToBrix(og);
        var corrSG = 1 - 0.0044993 * (ogBrix / corrFactor) + 0.0117741 * (sgBrix / corrFactor) + 0.000275806 * Math.pow(ogBrix / corrFactor, 2) - 0.00127169 * Math.pow(sgBrix / corrFactor, 2) - 0.00000727999 * Math.pow(ogBrix / corrFactor, 3) + 0.0000632929 * Math.pow(sgBrix / corrFactor, 3);

        var abv = getAlcohol(corrSG, og);

        setOKOutputValue($ragVal,Math.round(corrSG * 1000) / 1000);
        setOKOutputValue($ragAlcVal,Math.round(abv * 100) / 100);
    } else {
        setNAOutputValue($ragVal);
        setNAOutputValue($ragAlcVal);
    }
}

function rab() {
    var sgBrix = getGenericNumberVal($('#RABSGInput'));
    var ogBrix = getGenericNumberVal($('#RABOGInput'));
    var corrFactor = getGenericNumberVal($('#RAWortFactorInput'));

    $rabVal = $('#RABCalcValue');
    $rabAlcVal = $('#RABAlcCalcValue');

    if (sgBrix && ogBrix && corrFactor) {
        var corrSG = 1 - 0.0044993 * (ogBrix / corrFactor) + 0.0117741 * (sgBrix / corrFactor) + 0.000275806 * Math.pow(ogBrix / corrFactor, 2) - 0.00127169 * Math.pow(sgBrix / corrFactor, 2) - 0.00000727999 * Math.pow(ogBrix / corrFactor, 3) + 0.0000632929 * Math.pow(sgBrix / corrFactor, 3);
        var corrBrix = convertGravityToBrix(corrSG);

        var abv = getAlcohol(corrSG, convertBrixToGravity(ogBrix));

        setOKOutputValue($rabVal,Math.round(corrBrix * 100) / 100);
        setOKOutputValue($rabAlcVal,Math.round(abv * 100) / 100);
    } else {
        setNAOutputValue($rabVal);
        setNAOutputValue($rabAlcVal);
    }
}

function bgBtoG() {
    var brix = getGenericNumberVal($('#BGBrixInput'));
    $bgVal = $('#BGBrixToGravityCalcValue');

    if (brix) {
        var gravity = convertBrixToGravity(brix);
        setOKOutputValue($bgVal,Math.round(gravity * 10000) / 10000);
    } else {
        setNAOutputValue($bgVal);
    }
}

function bgGtoB() {
    var gravity = getGenericNumberVal($('#BGGravityInput'));
    $bgVal = $('#BGGravityToBrixCalcValue');

    if (gravity) {
        var brix = convertGravityToBrix(gravity);
        setOKOutputValue($bgVal,Math.round(brix * 100) / 100);
    } else {
        setNAOutputValue($bgVal);
    }
}

function setInputValue($element,value) {
  $element.val(value);
  setInputValidation($element,value);
}

function getWeight($element) {
    var val = parseFloat($element.val(), 10);
    if(!isMetric()) {
      if($element.hasClass('hbcKiloInput')) {
        val = HBCConverter.LbToKg(val);
      } else if($element.hasClass('hbcGramInput')) {
        val = HBCConverter.OzToG(val);
      }
    }

    setInputValidation($element,val);
    return val;
}

function getVolume($element) {
    var val = parseFloat($element.val(), 10);
    val = isMetric() ? val : HBCConverter.GalToL(val);
    setInputValidation($element, val);
    return val;
}

function getTemp($element) {
    var val = parseFloat($element.val(), 10);
    if(!isMetric()) {
      val = HBCConverter.FtoC(val);
    }
    setInputValidation($element, val);
    return val;
}

function getLength($element) {
    var val = parseFloat($element.val(), 10);
    if(!isMetric()) {
      val = HBCConverter.InchToCm(val);
    }
    setInputValidation($element, val);
    return val;
}

function getPercent($element) {
    var val = parseFloat($element.val().replace('%', ''), 10);
    if (val < 1) {
        val = val * 100; // guessing user has set 0.4 as in 40%.
    }
    setInputValidation($element, val);
    return val/100;
}

function getGenericNumberVal($element) {
    var val = parseFloat($element.val(), 10);
    setInputValidation($element, val);
    return val;
}

function getGenericVal($element) {
    var val = $element.val();
    setInputValidation($element, val);
    return val;
}

function setInputValidation($element,val) {
    var $p = $element.parents('.form-group');
     $p.removeClass('has-success').removeClass('has-warning').removeClass('has-error');
    if (val || val === 0) {
        $p.addClass('has-success');
    }
}

function getRecalcTimeoutFunc(elementSelector,func) {
  return function() {
    $el = $(elementSelector);
    $el.removeClass('hbcResultOK').addClass('hbcResultNA');
    $el.text('---');
    setTimeout(func,200);
  }
}

function setNAOutputValue($el) {
  $el.removeClass('hbcResultNA').removeClass('hbcResultOK').addClass('hbcResultNA');
  $el.text('---');
}

function setOKOutputValue($el,value) {
  $el.removeClass('hbcResultNA').removeClass('hbcResultOK').addClass('hbcResultOK');
  $el.text(value);
}

function convertBrixToGravity(brix) {
    return 1 + (brix / (258.6 - ((brix / 258.2) * 227.1)));
}

function convertGravityToBrix(gravity) {
    return (((182.4601 * gravity - 775.6821) * gravity + 1262.7794) * gravity - 669.5622);
}

function getAlcohol(fg, og) {
    return (76.08 * (og - fg) / (1.775 - og)) * (fg / 0.794);
}

function isMetric() {
  return $('.hbcMetricBtn.btn-lg').hasClass('btn-success');
}

var HBCConverter = {
  KgToLb : function(kg) {
    return kg * 2.2046;
  },
  LbToKg : function (lb) {
    return lb/2.2046;
  },
  FtoC : function(fahr) {
    return (fahr - 32) /  1.8000;
  },
  CtoF : function(celcius) {
    return (celcius * 1.8000) + 32.00;
  },
  LtoGal : function(liters) {
    return liters * 0.26417;
  },
  GalToL : function (gals) {
    return gals / 0.26417;
  },
  CmToInch : function(cm) {
    return cm * 0.39370;
  },
  InchToCm : function(inch) {
    return inch / 0.39370;
  },
  GToOz : function(grams) {
    return grams * 0.035274;
  },
  OzToG : function(oz) {
    return oz / 0.035274;
  },
  PsiToBar: function(psi) {
    return 0.0689475729 * psi;
  },
  BarToPsi: function(bar) {
    return psi / 0.0689475729;
  }
}
