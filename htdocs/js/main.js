Bio.main = function() {
    var biorhytmsPanel = new Bio.Biorhytms(),
        birthDatePicker = new Bio.DateOfBirth();
        
    $(document).on('pagecreate', '#biorhytms-data', function(event) {
        birthDatePicker.init(biorhytmsPanel);        
    });
    
    $(document).on('pagecreate', '#biorhytms-chart', function(event) {
        $(document).on('click', '#next-period', function(event) {
            biorhytmsPanel.nextPeriod();
        });
        
        $(document).on('click', '#prev-period', function(event) {
            biorhytmsPanel.previousPeriod();
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