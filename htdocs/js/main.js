Bio.main = function() {
    var biorhytmsPanel = new Bio.Biorhytms(),
        birthDatePicker = new Bio.DateOfBirth(),
        periodStartPicker = new Bio.PeriodStartPicker();
        
    $(document).on('pagecreate', '#biorhytms', function(event) {
        birthDatePicker.init(biorhytmsPanel);
        
        $(document).on('vmousedown', '#next-period', function(event) {
            biorhytmsPanel.nextPeriod();
        });
        
        $(document).on('vmousedown', '#prev-period', function(event) {
            biorhytmsPanel.previousPeriod();
        });
        
        periodStartPicker.init(biorhytmsPanel);
    });
    
    $(document).on('pageshow', '#biorhytms', function(event) {                
        biorhytmsPanel.init();
    });
};

Bio.warn = function(msg) {
    $("#biorhytms-warning-text").html(msg);
    $("#biorhytms-warning").popup("open");
};