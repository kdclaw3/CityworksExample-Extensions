function promptTotalHours() {

var employeeSid;

$.get("services/AMS/authentication/user?data=%7B%7D", function(data){
  //Get the employeeid
  employeeSid = data.Value.EmployeeSid;
});

//alert(employeeSid);

$.get("services/workorder/search?data={'ActualFinishDateIsNull':true,'Closed':false,'Canceled':false}", function(data){
  var woIds = data.Value
  
  $.get("services/AMS/LaborCost/WorkOrderCostsByWorkOrder?data={'WorkOrderIds':[" + woIds + "]}", function(data){

    var numberOfHours = 0;   
    var d = new Date();
    
    for (i=0; i < data.Value.length; i++) 
    {
      var od = new Date(data.Value[i].StartDate);
      if ( (data.Value[i].LaborSid == employeeSid) && ( d.toDateString() == od.toDateString() ) )
      { 
        numberOfHours = numberOfHours + data.Value[i].Hours
      }
    }

    alert('You have already charged ' + numberOfHours + ' hours of labor today.'); 
    
  });
    
});
  
}

