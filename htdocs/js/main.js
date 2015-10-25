Bio.main = function() {
    var biorhytmsPanel = new Bio.Biorhytms(),
        birthDatePicker = new Bio.DateOfBirth(),
        periodStartPicker = new Bio.PeriodStartPicker();
        
    $(document).on('pagecreate', '#biorhytms-data', function(event) {
        birthDatePicker.init(biorhytmsPanel);        
    });
    
    $(document).on('pagecreate', '#biorhytms-chart', function(event) {
        $(document).on('vmousedown click', '#next-period', function(event) {
            biorhytmsPanel.nextPeriod();
        });
        
        $(document).on('vmousedown click', '#prev-period', function(event) {
            biorhytmsPanel.previousPeriod();
        });
        
        periodStartPicker.init(biorhytmsPanel);
        
        $(document).on('vmousedown click', '#period-start-picker-trigger', function(event) {
            periodStartPicker.show();
        });
    });
    
    $(document).on('pageshow', '#biorhytms-chart', function(event) {                
        biorhytmsPanel.calculateSeries();
    });
};

Bio.warn = function(msg) {
    $("#biorhytms-warning-text").html(msg);
    $("#biorhytms-warning").popup("open");
};