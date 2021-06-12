import React,{Component} from 'react';
import DayPicker,{DateUtils} from 'react-day-picker';
import moment from 'moment';

 var data=[];
 let arr=[];
class CalenderBook extends Component {

    static defaultProps = {
        numberOfMonths: 2,
      };


    constructor(props) {
        super(props);
         super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
    }
    
   
    getInitialState() {
        return {
          from: undefined,
          to: undefined,
        };
      }

 handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
    console.log(range.from)
    console.log('to'+range.to)
     var dateObj1 = new Date(range.to);
    var momentObj1 = moment(dateObj1);
    var momentString1 = momentObj1.format('YYYY-MM-DD');
    sessionStorage.setItem('bookToDate',momentString1)
    var dateObj2 = new Date(range.from);
    var momentObj2 = moment(dateObj2);
    var momentString2 = momentObj2.format('YYYY-MM-DD');
    sessionStorage.setItem('bookFromDate',momentString2)
    sessionStorage.setItem('homeid',this.props.id)
  }
  handleResetClick() {
    this.setState(this.getInitialState());
    sessionStorage.removeItem('bookToDate')
    sessionStorage.removeItem('bookFromDate')
  }

    componentDidMount() {
        const url = "http://10.10.200.24:9000/bookingsByHome/" + this.props.id;
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-origin', url);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST');

        fetch(url, {
            headers: headers,
            method: 'GET'
        })
            .then(response => response.json())
            .then(contents => {
                console.log("in fetch" + contents);
                data=contents;
                console.log("data"+data)
               
                // sessionStorage.setItem("LatPlace",this.state.latitude1)
                // sessionStorage.setItem('LongPlace',this.state.longitude1)

            })
            .catch(() => console.log("can't access" + url + "response. "))
    }

    render(){
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        console.log("ownerToDate"+this.props.ownerToDate);
        console.log(this.props.ownerFromDate);
        console.log('length of data '+data.length)
        arr.push({after: new Date(this.props.ownerToDate),
            before:new Date(this.props.ownerFromDate)})
        if(data.length != 0)
        { 
            console.log("2")
        
            return(
       
                     <div>
                         
                         { data.map((home)=>{
            arr.push({after:new Date(home.fromDate),before:new Date(home.toDate)})
            arr.push(new Date(home.fromDate),new Date(home.toDate))

        })}

                     
                     
                                     <div>
                                    <center>    
                                    <DayPicker 
                                    className="Selectable"
                                    numberOfMonths={this.props.numberOfMonths}
                                    selectedDays={[from, { from, to }]}
                                    
                                    disabledDays={arr}
                                    modifiers={modifiers}
                                    onDayClick={this.handleDayClick}
                                />
                                
                                </center>                               
                                </div> 
  
           

            </div>

       )
      
    }
    else
    {
        console.log("1")
        return(
           
                          <div>
                        <center>  
                          <DayPicker 
                             className="Selectable"
                             numberOfMonths={this.props.numberOfMonths}
                             selectedDays={[from, { from, to }]}
                          
                            disabledDays={arr}
                          modifiers={modifiers}

                          onDayClick={this.handleDayClick}
                      />
                      
                    </center>                               
                      </div> 
                     )
                
                 }        
    }  
}



export default CalenderBook;
