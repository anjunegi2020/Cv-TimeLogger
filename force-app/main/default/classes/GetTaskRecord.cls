public with sharing class GetTaskRecord {

    @AuraEnabled(cacheable=true)
public static List<Task__c> getTask(String userId,Date taskdate) {
    list<Task__c> tasklist ;
    if(
        Task__c.SObjectType.getDescribe().isAccessible() &&
           Schema.SObjectType.Task__c.fields.Id.isAccessible() &&
           Schema.SObjectType.Task__c.fields.End_Date__c.isAccessible() &&
           Schema.SObjectType.Task__c.fields.Start_Date__c.isAccessible() &&
           Schema.SObjectType.Task__c.fields.OwnerId.isAccessible() &&
           Schema.SObjectType.Task__c.fields.Name.isAccessible() 
       )  {
        tasklist =  [SELECT id,Name,End_Date__c,Start_Date__c,OwnerId FROM Task__c WHERE Start_Date__c<=:taskdate AND End_Date__c >=:taskdate AND OwnerId=:userId] ;
    
    }

return tasklist;
}
@AuraEnabled(cacheable=true)
public static list<String> getTaskId(String userId,Date taskdate) {
    list<Task__c> tasklist ;
    list<String>  taskId;
    if(
        Task__c.SObjectType.getDescribe().isAccessible() &&
           Schema.SObjectType.Task__c.fields.Id.isAccessible() &&
           Schema.SObjectType.Task__c.fields.End_Date__c.isAccessible() &&
           Schema.SObjectType.Task__c.fields.Start_Date__c.isAccessible() &&
           Schema.SObjectType.Task__c.fields.OwnerId.isAccessible() &&
           Schema.SObjectType.Task__c.fields.Name.isAccessible() 
       )  {
        tasklist =  [SELECT id,Name,End_Date__c,Start_Date__c,OwnerId FROM Task__c WHERE Start_Date__c<=:taskdate AND End_Date__c >=:taskdate AND OwnerId=:userId] ;
    for(Task__c t : tasklist){
      taskId.add(t.Id);
    }
    return taskId;
    }

return taskId;
}

@AuraEnabled
public static void getTimeEntry(String userId,Date taskdate,Id taskId,decimal hour,String description) {
    list<TimeEntry__c> timEntrylist;
    list<TimeEntry__c> timEntryrecrod = new list<TimeEntry__c>();

    if(
        TimeEntry__c.SObjectType.getDescribe().isAccessible() &&
           Schema.SObjectType.TimeEntry__c.fields.Id.isAccessible() &&
           Schema.SObjectType.TimeEntry__c.fields.Hours__c.isAccessible() &&
           Schema.SObjectType.TimeEntry__c.fields.Task__c.isAccessible() &&
           Schema.SObjectType.TimeEntry__c.fields.Start_Date__c.isAccessible() &&
           Schema.SObjectType.TimeEntry__c.fields.Description__c.isAccessible() 
       )  {
        timEntrylist =  [SELECT id,Hours__c,Description__c,Task__c,Start_Date__c FROM TimeEntry__c WHERE Task__c=:taskId AND Start_Date__c=:taskdate  AND OwnerId=:userId  LIMIt 1 ];
system.debug('timEntrylist' + timEntrylist);
        if(timEntrylist.size()>0){
  timEntrylist[0].Hours__c =  hour;
 system.debug('t hours' +  timEntrylist[0].Hours__c);
   timEntrylist[0].Description__c = description;
  update timEntrylist; 
system.debug('Hello');
system.debug('Hour' + hour);
}
else{
    TimeEntry__c t = new TimeEntry__c();
    t.Hours__c = hour;
    t.Description__c = description;
    t.Task__c = taskId;
    t.Start_Date__c = taskdate ;
    t.OwnerId= userId;
    timEntryrecrod.add(t);
    insert timEntryrecrod;
}

       }
return ;
       }
       
 @AuraEnabled(cacheable=true)
 public static decimal getHours(String userId,Date taskdate,Id taskId) {
           list<TimeEntry__c> timEntrylist;
          Decimal hours;
           if(
               TimeEntry__c.SObjectType.getDescribe().isAccessible() &&
                  Schema.SObjectType.TimeEntry__c.fields.Id.isAccessible() &&
                  Schema.SObjectType.TimeEntry__c.fields.Hours__c.isAccessible() &&
                  Schema.SObjectType.TimeEntry__c.fields.Task__c.isAccessible() &&
                  Schema.SObjectType.TimeEntry__c.fields.Start_Date__c.isAccessible() 
              )  {
               timEntrylist =  [SELECT id,Hours__c,Description__c,Task__c,Start_Date__c FROM TimeEntry__c WHERE Task__c=:taskId AND Start_Date__c=:taskdate  AND OwnerId=:userId  LIMIt 1 ];
       system.debug('timEntrylist' + timEntrylist);
               if(timEntrylist.size()>0){
        hours = timEntrylist[0].Hours__c;
       }
       else{
          hours = 0.00;
       }
       
              }
       return hours ;
              }
              
              
 
 @AuraEnabled(cacheable=true)
public static decimal getTotalHours(String userId,Date taskdate) {
                                     list<Task__c> tasklist;
                                    
                                    Decimal totalhours = 0.00;
                                     if(
                                     Task__c.SObjectType.getDescribe().isAccessible() &&
                              Schema.SObjectType.Task__c.fields.Id.isAccessible() &&
                              Schema.SObjectType.Task__c.fields.End_Date__c.isAccessible() &&
                              Schema.SObjectType.Task__c.fields.Start_Date__c.isAccessible() &&
                              Schema.SObjectType.Task__c.fields.OwnerId.isAccessible() &&
                              Schema.SObjectType.Task__c.fields.Name.isAccessible()
                                           
)  {
                                        
                     tasklist =  [SELECT id,Name,End_Date__c,Start_Date__c,OwnerId,(SELECT id,Hours__c,Description__c,Task__c,Start_Date__c FROM TimeEntry__r WHERE Start_Date__c=:taskdate ) FROM Task__c WHERE  (Start_Date__c<=:taskdate AND End_Date__c >=:taskdate) AND OwnerId=:userId] ;
                                        
 if(!tasklist.isEmpty()){
                   for(Task__c task :tasklist){
                 for( TimeEntry__c t : task.TimeEntry__r){
                                   totalhours = totalhours + t.Hours__c;
                                }
                                
                               
                                 }
                                }

                                 else if(tasklist.isEmpty()){
                                   totalhours = 0.00;
                                 }
                                 
                                        }
                                 return totalhours ;
                                        }                    
       


 @AuraEnabled
public static decimal getTotalupdatedHours(String userId,Date taskdate) {
                                                         list<Task__c> tasklist;
                                                        
                                                        Decimal totalhours = 0.00;
                                                         if(
                                                         Task__c.SObjectType.getDescribe().isAccessible() &&
                                                  Schema.SObjectType.Task__c.fields.Id.isAccessible() &&
                                                  Schema.SObjectType.Task__c.fields.End_Date__c.isAccessible() &&
                                                  Schema.SObjectType.Task__c.fields.Start_Date__c.isAccessible() &&
                                                  Schema.SObjectType.Task__c.fields.OwnerId.isAccessible() &&
                                                  Schema.SObjectType.Task__c.fields.Name.isAccessible()
                                                               
                    )  {
                                                            
                                         tasklist =  [SELECT id,Name,End_Date__c,Start_Date__c,OwnerId,(SELECT id,Hours__c,Description__c,Task__c,Start_Date__c FROM TimeEntry__r WHERE Start_Date__c=:taskdate ) FROM Task__c WHERE  (Start_Date__c<=:taskdate AND End_Date__c >=:taskdate) AND OwnerId=:userId] ;
                                                            
                     if(!tasklist.isEmpty()){
                                       for(Task__c task :tasklist){
                                     for( TimeEntry__c t : task.TimeEntry__r){
                                                       totalhours = totalhours + t.Hours__c;
                                                    }
                                                    
                                                   
                                                     }
                                                    }
                    
                                                     else if(tasklist.isEmpty()){
                                                       totalhours = 0.00;
                                                     }
                                                     
                                                            }
                                                     return totalhours ;
                                                            }                                       

                                                        }