import { LightningElement,api,track,wire} from 'lwc';
import getTimeEntry from '@salesforce/apex/GetTaskRecord.getTimeEntry';
import getHours from '@salesforce/apex/GetTaskRecord.getHours';
import getTotalHours from '@salesforce/apex/GetTaskRecord.getTotalHours';
import { refreshApex } from '@salesforce/apex';


export default class Tracking extends LightningElement {
@api taskId;
 @track hours;
 @api taskdatevalue;
 @api Discription;
 @api timeEntyId;
 @api userId;
 @track loaded = false;
 @track oldHours;
 @api totalhours;
@track error;
@api spinval;
/* @wire(getTotalHours,{userId:'$userId',taskdate:'$taskdatevalue'})
    wireHours({error,data}){
	if(data){
	this.totalhours = data;
	        console.log('total Hours' + this.totalhours);
            const selectedEvent = new CustomEvent('uploadevent', {
                detail: {
                    totalHr: this.totalhours
                    
                } 
                
            });
            this.dispatchEvent(selectedEvent); 
    }
   
	else if(error){

	 this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error geting Hours',
                message: error.body.message,
                variant: 'error',
            }),
        );
	}
	}
 */
    @wire(getHours,{userId:'$userId',taskdate:'$taskdatevalue',taskId:'$taskId'})
    wireHours({error,data}){
	if(data){
	this.hours = data;
	        console.log('Hours' + this.hours);
          
    }
    else if(data==''){
        this.hours = 0.00;
    console.log('no hours' + this.hours);
       }
       else if(error){
        this.error = error;
        this.hours = undefined;
    
       }
	}
 /*connectedCallback(){
/*    getHours({userId: this.userId,taskdate: this.taskdatevalue,taskId:this.taskId})
    .then(result => {
  this.hours = result;
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
   
 getTotalHours({userId: this.userId,taskdate: this.taskdatevalue})
    .then(result => {
        
        this.totalhours = result;
        console.log('total child Hours' + this.totalhours);
        const selectedEvent = new CustomEvent('showevent', {
            detail: {
                totalHr: this.totalhours
                
            } 
            
        });
        this.dispatchEvent(selectedEvent); 
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

 } */
 
 sub15(event){
    event.preventDefault();
    this.hours =   this.hours - 0.25;
  
}
sub1(event){
    event.preventDefault();
    
    this.hours =   this.hours - 1.00;
  
}
sub4(event){
    event.preventDefault();
    
    this.hours =   this.hours - 4.00;
  
}
add15(event){
    event.preventDefault();
    
    this.hours =   this.hours +  0.25;
    console.log('Hour' +   this.hours );
}
add1(event){
    event.preventDefault();
    
    this.hours =   this.hours +  1.00;
    console.log('Hour' +   this.hours );
}
add4(event){
    event.preventDefault();
    
    this.hours =   this.hours +  4.00;
    console.log('Hour' +   this.hours );
}
 handleHourChange(event){
  this.hours = event.target.value;
  console.log('hours' + this.hours);
}
handleNoteChange(event){
    this.Discription = event.target.value;

}
CreateTimeEntry() {
    this.loaded = true;

    getTimeEntry({
       userId: this.userId,
        taskdate: this.taskdatevalue,
        taskId:this.taskId,
        hour:this.hours,
      description:this.Discription  
    })
    .then(() => {
console.log('hi');
this.dispatchEvent(new CustomEvent("create"));

this.oldHours = '';
    this.Discription = '';
 
    this.loaded = false;
    })
    .catch(error => {
    this.dispatchEvent(
        new ShowToastEvent({
            title: 'Error creating record',
            message: error.body.message,
            variant: 'error',
        }),
    );
});
}

handleLogACall2() {
    // Use the value to refresh wiredGetActivityHistory().
    return refreshApex(this.wireHours);
}


/* CreateTimeEntry(){
    this.loaded = true;
    const fields = {};
    fields[HOURS_FIELD.fieldApiName] = this.hours;
    fields[DISCRIPTION_FIELD.fieldApiName] = this.Discription;
    fields[TASK_FIELD.fieldApiName] = this.taskId;
    const recordInput = { apiName: TIMEENTRY_OBJECT.objectApiName, fields};
    createRecord(recordInput)
    .then(timeEnty =>{
        this.timeEntyId = timeEnty.id;
      //  console.log('shows time Value:' +timeEnty); 
       const hourChangeEvent = new CustomEvent('hourchange',{
            detail:{
            hrvalue: this.hourvalue,
            taskId:this.taskId
            }
            
            });
this.dispatchEvent(hourChangeEvent); 
         this.hours = '';
        this.Discription = '';
        this.loaded = false;
    })
    .catch(error => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error creating record',
                message: error.body.message,
                variant: 'error',
            }),
        );
    });





}
*/


}