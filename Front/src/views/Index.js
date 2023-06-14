
import { useState, useEffect } from "react";
import * as React from 'react';
import transformation from "../assets/img/brand/transformation.png"

import {
 
  Row,
  Col
} from "reactstrap";

// core components

import Header from "components/Headers/Header.js";
import { TopFiveEmployeeRecord } from "../network/ApiEmployee";
import { TopFiveResponsableRecord } from "../network/apiResponsable";
import { getAllRecomponses } from "../network/ApiRecompense"
import {savecomentaire} from "../network/ApiEmployee"
import { savereact } from "../network/ApiEmployee";
import { getsolde } from "../network/ApiEmployee";




const Index = (props) => {
  const [topusers, settopusers] = useState([]);
  const [topresp, settopresp] = useState([]);

  const [data, setData] = useState([]);
  const [isShowComments, setIsShowComments] = useState(false);
  const [isShowReactPopup, setIsShowReactPopup] = useState(false);
  const [isReactHiding, setIsReactHiding] = useState(false);
 const[selectedIdRecomponses,setSelectedIdRecomponses]=useState(0);
  const [commentList, setCommentList] = useState([]);
  const [datatransformation, setdatatransformation] = useState([]);
  const [IDR,setIDR]=useState(0)
  var [comentaire, setcomentaire] = useState({});
  const [nbrreact,setnbrreact]=useState(0)
  const [incriment,setincriment]=useState(false);
  

  if(localStorage.getItem("ResponsableInfo")){
    var image=JSON.parse(localStorage.getItem("ResponsableInfo")).image;
    var id_e=JSON.parse(localStorage.getItem("ResponsableInfo")).id_e;

  
 
  }else if (localStorage.getItem("employeeInfo")) {
  var image=JSON.parse(localStorage.getItem("employeeInfo")).image;
  var id_e=JSON.parse(localStorage.getItem("employeeInfo")).id_e;
 
}
 

  // const [activeNav, setActiveNav] = useState(1);
  // const [chartExample1Data, setChartExample1Data] = useState("data1");
  // const [chartEmployeeData, setchartEmployeeData] = useState([]);
  // if (window.Chart) {
  //   parseOptions(Chart, chartOptions());
  // }

  // const toggleNavs = (e, index) => {
  //   e.preventDefault();
  //   setActiveNav(index);
  //   setChartExample1Data("data" + index);
  // };
  // const data = {
  //   labels: ["Sunday", "Monday", "Tuesday",
  //     "Wednesday", "Thursday", "Friday", "Saturday"],
  //   datasets: [
  //     {
  //       label: "Hours Studied in Geeksforgeeks",
  //       data: [2, 5, 6, 7, 3, 3, 4],
  //       backgroundColor: "#87CEFA",
  //       borderWidth: 1,
  //       borderColor: "#000000",
  //     }
  //   ]
  // }
 


  useEffect(() => {
    const runAsync = async () => {

      const response = await TopFiveEmployeeRecord();
      console.log("responce///////////////////////", response)
      const { data } = response;
      settopusers(data.rep);
      console.log("top users///////////////////////", data)


      /////////////////////////////////////////////////////
      const listtopresp = await TopFiveResponsableRecord();
      console.log("//////////resp", listtopresp)
      const dataresp = listtopresp.data;
      settopresp(dataresp.rep)
      console.log("//////////resp////////////////////", topresp)

      /////////////////////////////////////////////////////
      const alltransformation = await getAllRecomponses();
      console.log("////////transformation", alltransformation)
      // const {datarecomp}=alltransformation.data.data;
      // console.log("////////transformation data",datarecomp)
      const datatran=alltransformation.data.data
      setdatatransformation(datatran)
      console.log("////////transformation data", datatransformation)








      // var labelDataEmployee=[]
      // var valueDataEmployee=[];
      // const arrayApiEmployee=data.rep;
      // console.log("//////////////////// data api rest ====>"+JSON.stringify(arrayApiEmployee));
      // for(let i=0;i<arrayApiEmployee.length;i++){
      //   let objE=arrayApiEmployee[i];
      //   labelDataEmployee.push(objE.nom+" "+objE.prenom);
      //   valueDataEmployee.push(objE.nbr_point);
      // }
      // const dataset = {
      //   labels: labelDataEmployee,
      //   datasets: [
      //     {
      //       label: "Top employees score",
      //       data: valueDataEmployee,
      //       backgroundColor: '#ffadb9',
      //       borderColor: '#f7072b',
      //       borderWidth: 2,
      //       barThickness: 30,
      //       borderRadius: 20

      //     }
      //   ],
      //   options: {
      //     scales: {
      //         y: {
      //             beginAtZero: true
      //         }
      //     }
      // }
      // }
      // setchartEmployeeData(dataset);
      // console.log("//////////////////// data api  ====>"+JSON.stringify(dataset));

    };
    runAsync();
  }, []);

  


  ////////////////////////////////////////////////////////////////////////////////////////
  const THROTTLE_TIME = 5000;

  /**
   * This will serve as the login information of the user
   */
  function getSession() {
    return {
      Avatar: "https://3.bp.blogspot.com/-xT36Kpq_T_E/W1a5CIwueAI/AAAAAAABNjc/nkwOIiInph0FSJ3cpJHdE1Ghu60HX5BfgCLcBGAs/s800/niyakeru_takuramu_ayashii_man.png",
      Name: "Login User",
    };
  }

  /**
   * This will serve as the data to be displayed on the page
   */
  function getData() {
    return {
      Avatar: "https://2.bp.blogspot.com/-6iIUl-9hmVY/W-0gXQBaPjI/AAAAAAABQJA/OQPFQ8RJJTgNfWqcKPLb65nljFs-iMxBQCLcBGAs/s800/angry_fukureru_boy.png",
      Title: "Example Reacc post",
      Content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      Name: "Example Author",
      DateTime: "2021-08-12 19:00:00",
      DateTimeFormat: "2021 Aug 12 19:00",
      ReactCount: "100",
    }
  }

  /**
   * This will serve as the list of comments to be displayed
   */
  function getComments() {

    return [{
      Avatar: "https://1.bp.blogspot.com/-Umt9sSByADg/XhwqmwqIxlI/AAAAAAABXB0/f981O4YZoX8s7wGE7IdNLwurDIiqvVzvQCNcBGAsYHQ/s1600/pose_warau_kuchi_kakusu_woman.png",
      Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      Name: "Commenter One",
      DateTime: "2021-08-16 12:00:00",
      DateTimeFormat: "2021 Aug 16 12:00",
    }, {
      Avatar: "https://1.bp.blogspot.com/-ZOg0qAG4ewU/Xub_uw6q0DI/AAAAAAABZio/MshyuVBpHUgaOKJtL47LmVkCf5Vge6MQQCNcBGAsYHQ/s1600/pose_pien_uruuru_woman.png",
      Comment: "Consectetur adipiscing elit",
      Name: "Commenter Two",
      DateTime: "2021-08-16 13:00:00",
      DateTimeFormat: "2021 Aug 16 13:00",
    }, {
      Avatar: "https://2.bp.blogspot.com/-6iIUl-9hmVY/W-0gXQBaPjI/AAAAAAABQJA/OQPFQ8RJJTgNfWqcKPLb65nljFs-iMxBQCLcBGAs/s800/angry_fukureru_boy.png",
      Comment: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      Name: "Example Author",
      DateTime: "2021-08-16 14:00:00",
      DateTimeFormat: "2021 Aug 16 14:00",
    }];
  }
  /**
   * Avatar component
   */
  function AvatarElm(props) {
    const src = props.link;
    // console.log("image",src.link.image)


    return (
      <div className="post-avatar">
        <figure>
          <img src={`data:image/jpeg;base64,${src}`} />
        </figure>
      </div>
    )
    
  }

  /**
   * Avatar, name, and post date component
   */
  function PersonDisplay(props) {
    const data = props.data;
    const dateaction = props.date
    // console.log("////////////////data", data)
    const showIcon = props["show-icon"];

    let userIcon = null;
    let dateIcon = null;

    if (showIcon === true) {
      userIcon = (<i className="far fa-user"></i>);
      dateIcon = (<i className="far fa-clock"></i>);
    }
    

    return [(
      <AvatarElm link={data.image} />
    ), (
      <div className="post-identifier">
        <p>
          {userIcon}
          <a href="#" className="post-author-link margin-left-half">
            {data.nom}  {data.prenom}
          </a>
        </p>
        <p style={{marginTop:"-10px"}}>
          <small>
            {dateIcon}
            <time className="margin-left-half" datetime={data.DateTime}>
              {dateaction}
            </time>
          </small>
        </p>
      </div>
    )];
    
  }

  /**
   * Container of the comments
   */
  function CommentsSection(props) {
    const [comment,setComment]=useState("");
    const [listcomment,setlistComment]=useState([]);
    if(localStorage.getItem("ResponsableInfo")){
     
      var id_emet=JSON.parse(localStorage.getItem("ResponsableInfo")).id_r;
    }else if (localStorage.getItem("employeeInfo")) {
    
    var id_emet=JSON.parse(localStorage.getItem("employeeInfo")).id_e;

   }
    var id_r=props.idt
    console.log("id recompence ",id_r)
    

    var teste=props.data
     comentaire=teste
       // move the following code into a useEffect hook
  useEffect(() => {
    var teste = props.data;
    setlistComment(teste);
  }, []);
     
   return(
        <div   style={{marginTop:"10px",paddingBottom:"10px"}}>
          <div className="comment-input">
           <AvatarElm link={image} />
           <textarea
           value={comment}
          onChange={(e) => {
            let val=e.target.value
            setComment(val)
             console.log("comentaire",comment)                                   
          }}
          
            className="text-comment"
            placeholder="Write your comment here..."></textarea>
           <button
            className="send-button"
              // handelcomentaire(comment,id_e,id_r)
              onClick={()=>{
              console.log("teste button");
              
              handelcomentaire(comment, id_emet, id_r, listcomment, setlistComment,setComment);
         

            }}
              
              // console.error(
              //   "This thing will not work even if you click this: " +
              //   "Please try to 'mouseover' or 'hover' on the button " +
              //   "to see the purpose of this pen."
              // );
            >
            <i className="fas fa-paper-plane"></i>
           </button>
           {/* <Button
            
               
            className="send-button"
             onClick={()=>{console.log("teste button")}}
             
          ></Button> */}
          
          </div>
         {/* // )]; */}
         {listcomment.map((coment) =>(
         <div className="comment-container" >
          <div className="comment-top">
            <PersonDisplay data={coment.id_e_employee} date={coment.date} show-icon={false} />
            {/* <p> </p> */}
          </div>
          <div className="comment-content" style={{marginTop:"-10px"}}>
          { coment.comentaire}
          </div>
          </div >
         ))}
           </div>
        )
     
  }

/**
 * Create component of a reaction face
 */
function ReactFace(props) {
  const type = props["type"];
  const id_r = props.id_r ;

  let faceClassName = `react-face ${type}`;

  return (<div className={faceClassName} onClick={()=>{
  
  setincriment(!incriment)
  console.log("teste react",incriment)
  handelreact(IDR,nbrreact)
}}
  ></div>);
}

/**
 * Component of the post on the page
 */


let reactPopup = null;

if (isShowReactPopup === true) {
  let reactPopupClassName = "post-react-popup";

  if (isReactHiding === true) {
    reactPopupClassName += " hiding"
  }

  reactPopup = (
    <div
    
      className={reactPopupClassName}
      onMouseOver={() => {
        setIsShowReactPopup(true);
        setIsReactHiding(false);
      }}
      onMouseLeave={() => {
        setIsReactHiding(true);
      }}
      onAnimationEnd={evt => {
        if (evt.animationName === "hide") {
          setIsShowReactPopup(false);
        }
      }}>
      <ReactFace className="nesrine"
       id_r = {IDR} type="smile" />
      <ReactFace id_r = {IDR} type="happy" />
      <ReactFace id_r = {IDR} type="surprised" />
      <ReactFace id_r = {IDR} type="sad" />
      <ReactFace id_r = {IDR} type="angry" />
    </div>
  );
}


// Simulate the fetching of data
const handelreact = (IDR,nbrreact) => {
  console.log("nbr react",nbrreact)
  console.log("id recompence",IDR)
  let newval=0
  if(incriment==true){
    newval=nbrreact+1
    console.log("incriment ",newval) }
  else{
    newval=nbrreact-1;
    console.log("decriment ",newval)
    

  }

  const react = savereact(IDR,newval).then(rep=>{
    console.log("***************** react success "+JSON.stringify(rep));
  }).catch(err=>{
    console.log("***************** react success "+JSON.stringify(err));

  })
  console.log("/////////////////// react",IDR)
}

const handelcomentaire = (comment, id_e, id_r, listcomment, setlistComment,setComment) => {

  //console.log("*********** list comment "+JSON.stringify(listComment));

  console.log("hhhhhhh",comment,id_e,id_r)
  const comt= savecomentaire(comment,id_e,id_r).then(rep=>{
    const {data} = rep;
    const repComment=data.comentaire;
    console.log("comment reponse api ",JSON.stringify(repComment))
    console.log("comment after  ",JSON.stringify(listcomment.length))

    repComment.id_e_employee=JSON.parse(localStorage.getItem("employeeInfo"));
    setlistComment([...listcomment, repComment]);
    setComment('');
    console.log("comment before  ",JSON.stringify(listcomment.length))

  }).catch(err=>{
    console.log("comment reponse api err======> ",JSON.stringify(err))
  })

  

}


return (
  <>
    <Header  />
   
    <Row  >
    {/* ///////////////////////////////////////////////////////////////////// */}
<Col xs="8"  style={{overflow: "scroll",height:"700px"}}>
    {datatransformation.map((recompence,index) => (
      <article className="post shadow"style={{ marginBottom: "20px" }}>
        {/* <header className="post-header">
        <h2>{data.Title}</h2>
      </header> */}
        <section className="post-top">
          <PersonDisplay data={recompence.id_e_r_employee} date={recompence.date_attribuation} show-icon={true} />
        </section>
        <section className="post-content" >
          <p>


            <h3>Congratulations 🥳</h3>
            Receive {recompence.nbr_point} points from {recompence.id_e_employee.nom} {recompence.id_e_employee.prenom}
          </p>
          <img src={transformation} alt="transformation" style={{ height: "400px", width: "100%" }}></img>
          <p className="content-reactions">
            <i className="far fa-thumbs-up"></i>
            <span className="margin-left-quarter">{recompence.react}</span>
            <span className="margin-left-quarter">reactions</span>
          </p>
          {reactPopup}
        </section>
        <section className="post-commands" >
          <button
          style={{marginLeft:"90px"}}
            className="post-button"
            onMouseOver={() => {
            
              setIsShowReactPopup(true);
              setIDR(recompence.id_r)
              setnbrreact(recompence.react)
              setIsReactHiding(false);
              
              
            }}
            onMouseLeave={() => {
              setIsReactHiding(true);
            }}>
            <i className="far fa-thumbs-up like"></i>
            <span>Reaction</span>


          </button>
      
           <button
           
            className="post-button"
            onClick={evt => {
              setSelectedIdRecomponses(recompence.id_r);
              setIsShowComments(!isShowComments)
            }}>
            <i className="far fa-comment"></i>
            <span>Comment </span>
          </button>
        </section >
        {selectedIdRecomponses==recompence.id_r && isShowComments==true ?  
        <CommentsSection idt={recompence.id_r} data={recompence.comentaire_recomponces} show-comments={isShowComments} />
       :'' }
        </article>
    ))}
    </Col>
    {/* ////////////////////////////////////////////////////////////////////////////// */}
    <Col xs="4" style={{Position:"static"}}>     
    <div className="shadow" style={{backgroundColor:"white",borderRadius:"20px",width:"280px", paddingTop:"10px"}}>
      
      <h4  style={{fontSize:"14px",textAlign:"center"}}>Top Manager</h4>
       <hr style={{marginTop:"10px"}} />
        <ul  style={{listStyle:"none",marginLeft:"-35px",marginTop:"-30px" ,paddingBottom:"20px"}}>
        {topresp.map((responsable,index1) => (
             <li style={{marginTop:"5px"}} >
            <img
            src={`data:image/jpeg;base64,${responsable.image}`}
            alt=''
            style={{ width: '40px', height: '35px', borderRadius:"50%" }}
           
          />
             <span style={{fontSize:"13px"}}>{responsable.nom } {responsable.prenom } : </span>
             <span style={{fontSize:"13px"}} >{responsable.nbr_point }</span>
             {
            index1==0? <img src="https://cdn.pixabay.com/photo/2016/08/26/15/56/medal-1622523_1280.png" alt="" style={{width:"35px",height:"30px"}}></img>:''
          }
              {
             index1==1?<img src="https://sitescashback.com/wp-content/uploads/2016/12/medaille-argent-classement-cashback-600x600.png" alt="" style={{width:"35px",height:"30px"}}></img> :''
          }
             {
            index1==2? <img src="https://cdn.pixabay.com/photo/2016/08/26/16/04/medal-1622549_960_720.png" alt="" style={{width:"35px",height:"30px"}}></img>:''
          }
           </li>
           
          ))}
        </ul>
        
        
    </div>
    <div className="shadow" style={{backgroundColor:"white",borderRadius:"20px",width:"280px" , paddingTop:"10px"}} >
      
      
     <h4 style={{fontSize:"14px",textAlign:"center"}}>Top Employee</h4>
    
        <hr style={{marginTop:"10px"}} />
        <ul style={{listStyle:"none",marginLeft:"-35px",marginTop:"-30px" ,paddingBottom:"20px"}}>
        {topusers.map((employee,index) => (
             <li style={{marginTop:"5px"}} >
            <img
            src={`data:image/jpeg;base64,${employee.image}`}
            alt=''
            style={{ width: '40px', height: '35px', borderRadius:"50%" }}
            
          />
             <span style={{fontSize:"13px"}}>{employee.nom } {employee.prenom } :</span>
             <span style={{fontSize:"13px"}}>{employee.nbr_point }</span>
             {
            index==0? <img src="https://cdn.pixabay.com/photo/2016/08/26/15/56/medal-1622523_1280.png" alt="" style={{width:"35px",height:"30px"}}></img>:''
          }
              {
             index==1?<img src="https://sitescashback.com/wp-content/uploads/2016/12/medaille-argent-classement-cashback-600x600.png" alt="" style={{width:"35px",height:"30px"}}></img> :''
          }
             {
            index==2? <img src="https://cdn.pixabay.com/photo/2016/08/26/16/04/medal-1622549_960_720.png" alt="" style={{width:"35px",height:"30px"}}></img>  :''
          }
           </li>
          ))}
        </ul>
        
        
    </div>
    </Col> 
    </Row>  
  </>
);
          }


export default Index;
