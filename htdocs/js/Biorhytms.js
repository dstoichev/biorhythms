Bio.Biorhytms = function() {
    this.birthDay = null;
    
    this.biorhytmsChart = new Bio.Chart();
    
    this.defaultBirthdate = moment('1972-06-25', 'YYYY-MM-DD');
    
    this.periodLength = 26;
    
    this.periodStart = moment();
};

Bio.Biorhytms.prototype = {
    calculateSeries : function() {
        var birthDay = this.birthDay,
            currentDiffInDays = this.periodStart.diff(birthDay, 'days'),
            physical = [],
            emotional = [],
            intellectual = [],
            currentDay = this.periodStart.clone(),
            currentDayAsString = currentDay.format('YYYY-MM-DD'),
            currentPhysicalVal, currentEmotionalVal, currentIntellectualVal,
            isPhysicalCritical, isEmotionalCritical, isIntellectualCritical,
            isDoubleCritical, isTripleCritical;
            
        for (var i = 1; i < this.periodLength; i++) {
            currentPhysicalVal = Math.sin(2 * Math.PI * currentDiffInDays / 23);
            isPhysicalCritical = (0 == currentPhysicalVal) || (0 == currentDiffInDays % 11 && 0 < currentPhysicalVal); // half period
            physical.push([currentDayAsString, currentPhysicalVal]);
            
            currentEmotionalVal = Math.sin(2 * Math.PI * currentDiffInDays / 28);
            isEmotionalCritical = (0 == currentDiffInDays % 14);
            emotional.push([currentDayAsString, currentEmotionalVal]);
            
            currentIntellectualVal = Math.sin(2 * Math.PI * currentDiffInDays / 33);
            isIntellectualCritical = (0 == currentIntellectualVal) || (0 == currentDiffInDays % 16 && 0 < currentIntellectualVal); // half period
            intellectual.push([currentDayAsString, currentIntellectualVal]);
            
            isTripleCritical = (isPhysicalCritical && isEmotionalCritical && isIntellectualCritical);
            isDoubleCritical = ! isTripleCritical && ((isPhysicalCritical && isEmotionalCritical) ||
                                                      (isPhysicalCritical && isIntellectualCritical) ||
                                                      (isEmotionalCritical && isIntellectualCritical));
            
            currentDiffInDays++;
            currentDay.add(1, 'day');
            currentDayAsString = currentDay.format('YYYY-MM-DD')
        }
        
        var series = [
            {
                config : {
                    color : '#00cc00'
                },
                data : physical
            }, {
                config : {
                    color : '#ff66ff'
                },
                data : emotional
            }, {
                config : {
                    color : '#ffff00'
                },
                data : intellectual
            }                        
        ];
        
        this.biorhytmsChart.addSeries(series);
    },
    
    hasBirthDateSet : function() {
        return this.birthDay !== null;
    },
    
    init : function() {
        if (! this.hasBirthDateSet()) {
            this.setBirthDate(this.defaultBirthdate);
        }
        else {
            this.calculateSeries();
        }
    },
    
    nextPeriod : function() {
        this.periodStart.add(this.periodLength - 2, 'days');
        this.calculateSeries();
    },
    
    previousPeriod : function() {
        this.periodStart.subtract(this.periodLength - 2, 'days');
        this.calculateSeries();
    },
    
    setBirthDate : function(dateMoment) {
        this.birthDay = dateMoment;
        $("#display-birthdate").html(dateMoment.format('DD-MMM-YYYY'));
        this.calculateSeries();
    },
    
    setPeriodStart : function(dateMoment) {
        this.periodStart = dateMoment;
        this.calculateSeries();
    }
};
