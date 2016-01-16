Bio.Biorhytms = function() {
    this.birthDay = null;
    
    this.biorhytmsChart = new Bio.Chart();
    
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
            currentDayAsString = currentDay.format('YYYY-MM-DD');
            
        for (var i = 1; i < this.periodLength; i++) {
            physical.push([currentDayAsString, Math.sin(2 * Math.PI * currentDiffInDays / 23)]);
            emotional.push([currentDayAsString, Math.sin(2 * Math.PI * currentDiffInDays / 28)]);
            intellectual.push([currentDayAsString, Math.sin(2 * Math.PI * currentDiffInDays / 33)]);
            
            currentDiffInDays++;
            currentDay.add(1, 'day');
            currentDayAsString = currentDay.format('YYYY-MM-DD')
        }
        
        var series = [
            {
                config : {},
                data : physical
            }, {
                config : {},
                data : emotional
            }, {
                config : {},
                data : intellectual
            }                        
        ];
        
        this.biorhytmsChart.addSeries(series);
    },
    
    hasBirthDateSet : function() {
        return this.birthDay !== null;
    },
    
    nextPeriod : function() {
        this.periodStart.add(this.periodLength - 2, 'days');
        this.calculateSeries();
    },
    
    previousPeriod : function() {
        this.periodStart.subtract(this.periodLength - 2, 'days');
        this.calculateSeries();
    },
    
    setBirthDate : function(dateString) {
        this.birthDay = moment(dateString, 'YYYYMMDD'); // See JSCal2 inner format
    },
    
    setPeriodStart : function(dateString) {
        this.periodStart = moment(dateString, 'YYYYMMDD'); // // See JSCal2 inner format
        this.calculateSeries();
    }
};
