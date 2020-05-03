import { LightningElement, track,api,wire} from 'lwc';
import Id from '@salesforce/user/Id';
import getTask from '@salesforce/apex/GetTaskRecord.getTask';
import getTotalHours from '@salesforce/apex/GetTaskRecord.getTotalHours';
import getTotalupdatedHours from '@salesforce/apex/GetTaskRecord.getTotalupdatedHours';
import { refreshApex } from '@salesforce/apex';
export default class ResourceHero extends LightningElement {
     //get today's date

     @api userId = Id;
     @api datevalue = new Date().toISOString().slice(0,10);
   @track error;
   @api hourvalue ;
   @api taskId;
   @track task;
   @track hrval;
   @track keyId;
   @track updatedHours;
   @track totalhours;
   @track showdata;
   wiredIssueResult;
   @track error;
 @track itemsId;

   @wire(getTotalHours,{userId:'$userId',taskdate:'$datevalue'})
   wireHours({error,data}){
   if(data){
   this.totalhours = data;
   this.error = undefined;
  
  console.log('Hiii ' + JSON.stringify(this.totalhours));
}
  else if(data==''){
    this.totalhours = 0.00;
console.log('no hours' + this.totalhours);
   }
   else if(error){
    this.error = error;
    this.totalhours = undefined;

   }
   }




   @wire(getTask, {userId: '$userId',taskdate: '$datevalue'})
 wiredIssue(result) {
    this.wiredIssueResult = result;
    if (result.data) {
        this.task = result.data;
        this.error = undefined;
  
    } else if (result.error) {
        this.error = result.error;
        this.task = undefined;
    }
}

 
 
 
   handleSectionToggle(event) {
    const  openSections = event.currentTarget.Id;
   
}
     timehandler(event){
     this.datevalue = event.target.value;
 console.log('datevalue'+ this.datevalue);
         }
 
 showprevious(event){
 
 /*var date = this.datevalue;
 var date1 = date.split("-");
 var yy = date1[0];
 console.log('year'+ yy);
       var mon = date1[1];
 console.log('mon'+ mon);
 
       var dd = parseInt(date1[2]) - 1 ;
 console.log('dd'+ dd);
 this.newvalue = yy + "-"+ mon + "-" +  dd ; 
 console.log('dare' + this.newvalue);
 this.datevalue = (this.newvalue).toString().slice(0,10);
 console.log('newvalue' + this.datevalue);
 this.handleLogACall();
 this.handleLogACall2();
 
*/
var currentdate = new Date(this.datevalue);
console.log('current' + currentdate);
currentdate.setDate(currentdate.getDate() - 1);
this.newvalue = currentdate.toJSON().slice(0,10);
console.log('tommo' + this.newvalue);
this.datevalue = this.newvalue;
console.log('Hello '+ this.datevalue);
this.handleLogACall();
this.handleLogACall2();
 }
 
 shownext(event){
 
/* var date = this.datevalue;
 console.log('date ' + date);
 var date1 = date.split("-");
 var yy = date1[0];
 console.log('year'+ yy);
       var mon = date1[1];
 console.log('mon'+ mon);
 
       var dd = parseInt(date1[2]) + 1;
 console.log('dd'+ dd);
 this.newvalue = yy + "-"+ mon + "-" +  dd ; 
 console.log('dare' + this.newvalue);
 this.datevalue = (this.newvalue).toString().slice(0,10);
 console.log('newvalue' + this.datevalue);
 this.handleLogACall();

 this.handleLogACall2();

 */
var currentdate = new Date(this.datevalue);
console.log('current' + currentdate);
currentdate.setDate(currentdate.getDate() + 1);
this.newvalue = currentdate.toJSON().slice(0,10);
console.log('tommo' + this.newvalue);
this.datevalue = this.newvalue;
console.log('Hello '+ this.datevalue);
this.handleLogACall();

 this.handleLogACall2();
 }
 
 
 handleLogACall() {
       // Use the value to refresh tasks().
  return refreshApex(this.tasks);
   
 }
   handleLogACall2() {
    // Use the value to refresh wireHours().
    return refreshApex(this.wireHours);
}


reloadList(event) {
    console.log('i am here');
    console.log('event name' + event.detail);
    getTotalupdatedHours({userId: this.userId,taskdate: this.datevalue})
    .then(result => {
  this.totalhours = result;
  console.log('update '+ this.totalhours);
 })
.catch(error => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error geting Hours',
                message: error.body.message,
                variant: 'error',
            }),
        );
    });
	
}
}