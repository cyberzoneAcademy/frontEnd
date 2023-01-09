import React, { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import HeaderSection from '../unitsDashboard/components/HeaderSection'
import AdminHeaderSection from '../AdminDashboard/components/AdminHeaderSection'
import FooterSection from '../unitsDashboard/components/FooterSection'
import SecondUnitFooter from "../unitsDashboard/components/SecondUnitFooter";
import axios from 'axios'
import { API } from "../config"
import Bg from './bg.png'
import Bg2 from './dots.jpg'
import ThirdFooter from "../unitsDashboard/components/ThirdFooter";
function StructureThreeContent(props){
    var head = props.show;
    const location = useLocation();
    const unitContent = location.state;
    const [unitsData, setUnitsData] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`${API}/unit/unitsdata/${unitContent.id}`).then(({data})=>{
            setUnitsData(data.data)
        }).catch((err)=>{
         //    console.log("Something Went Wrong:", err)
        })
        // Aos.init({ duration: 2000 });
      }, []);

      const submitUnitContent = (unitDataInfo) => {
        axios.put(`${API}/unit/unit/${unitContent.id}`, unitDataInfo)
            .then(res => {
                if (res.status === 200) {
                    window.location.reload();
                } else Promise.reject();
            })
            .catch(err => {
            })
      }


//--------------------------------------------- calculate time spent on this page ----------------------------------------

const submitUnit = (unitInfo) => {
    axios.put(`${API}/unit/unit/${unitContent.id}`, unitInfo)
        .then(res => {
        })
        .catch(err => {
        })
}

let timeSpentScrolling = 0;

let isHalted = false;
let haltedStartTime, haltedEndTime;
let totalHaltedTime = 0;

const update_halt_state = () => {
    if (isHalted) {
        isHalted = false;
        haltedEndTime = new Date().getTime()
        totalHaltedTime += (haltedEndTime - haltedStartTime)
    } else {
        isHalted = true;
        haltedStartTime = new Date().getTime()
    }
}

// Listen for scroll events
window.addEventListener('scroll', () => {
    timeSpentScrolling += 1.8;
    update_halt_state()
});

document.addEventListener("DOMContentLoaded", () => {
    const start = new Date().getTime();

    // AVERAGE SCROLLING INTERVAL - 39 seconds
    setInterval(() => {
        if (new Date().getTime() - start > 39000) {
            update_halt_state()
        }
    }, 39000)

    window.addEventListener("beforeunload", () => {
        const end = new Date().getTime();
        update_halt_state()

        const totalTime = (end - start) - (timeSpentScrolling) - totalHaltedTime;

        var units = {};
            unitsData.map((item) => {
                units = item
        });

        const time_spent = Math.round(parseInt(totalTime) + parseInt(units.time_spent));
        submitUnit({
            time_spent,
        });

    });

});

//------------------------------------------------------------------------------------------------------------------------------------------








      const deleteUnitContent = () => {
        var unit_content = [{}];
        {unitsData.map((item) => {
             item.unit_content.splice(unitContent.index,1);
             unit_content = item.unit_content;
        })}

        submitUnitContent({
            unit_content,
        });
      }


    return(
        <>
            <div className="">
                {/*-- Modal =====*/}
                <div className="modal fade" id="del" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete units content</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p style={{color:"gray"}}>Are you sure you want to permanently delete this units content?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger mr-1" data-dismiss="modal">Close</button>
                                <button type="submit" name="delete_service" className="btn btn-info" onClick={deleteUnitContent}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Unit-Dashboard-wrapper">
                {head == "admin" ?
                    <AdminHeaderSection edit="editstructurethree" prev="/cyberspace" destination="Leçon 2 - Cyberspace" index={unitContent.index} id={unitContent.id} content={unitContent.content} header_title={unitContent.content.page_title}/>
                    :
                    <HeaderSection prev="/cyberspace" destination="Leçon 2 - Cyberspace" header_title={unitContent.content.page_title}/>
                }
                </div>
                <div className="" style={{marginTop:"-1.5rem", background:"white"}}>
                    <div className="heading-image">
                        <div className="heading-image-text"><p>yiuioiop danca jdcd</p></div>
                        <div className="image-div"><img src={Bg}/></div>
                    </div>

                    <div className="heading-text">
                        <p>wmdawds adjaiosd wijdi</p>
                    </div>

                    <div className="text-after-heading-image">
                        <p>fjdfpo esfhioe efejhf uadl asdnm  adasd d sndisd wjdopwadn oawdjoasnaodmosd ;owd lwilidniw duuwd dsofjsd sufefdi fjdfpo esfhioe efejhf uadl asdnm  adasd d sndisd wjdopwadn oawdjoasnaodmosd ;owd lwilidniw duuwd dsofjsd sufefdi fjdfpo esfhioe efejhf uadl asdnm  adasd d sndisd wjdopwadn oawdjoasnaodmosd ;owd lwilidniw duuwd dsofjsd sufefdi fjdfpo esfhioe efejhf uadl asdnm  adasd </p>
                        <p>fjdfpo esfhioe efejhf uadl asdnm  adasd d sndisd wjdopwadn oawdjoasnaodmosd ;owd lwilidniw duuwd dsofjsd sufefdi fjdfpo esfhioe efejhf uadl asdnm  adasd d sndisd wjdopwadn oawdjoasnaodmosd ;owd lwilidniw duuwd dsofjsd sufefdi fjdfpo esfhioe efejhf uadl asdnm  adasd d sndisd wjdopwadn oawdjoasnaodmosd ;owd lwilidniw duuwd dsofjsd sufefdi fjdfpo esfhioe efejhf uadl asdnm  adasd </p>
                        <p>fjdfpo esfhioe efejhf uadl asdnm  adasd d sndisd wjdopwadn oawdjoasnaodmosd ;owd lwilidniw duuwd dsofjsd sufefdi fjdfpo esfhioe efejhf uadl asdnm  adasd d sndisd wjdopwadn oawdjoasnaodmosd ;owd lwilidniw duuwd dsofjsd sufefdi fjdfpo esfhioe efejhf uadl asdnm  adasd d sndisd wjdopwadn oawdjoasnaodmosd ;owd lwilidniw duuwd dsofjsd sufefdi fjdfpo esfhioe efejhf uadl asdnm  adasd </p>
                        <p>fjdfpo esfhioe efejhf uadl asdnm  adasd d sndisd wjdopwadn oawdjoasnaodmosd ;owd lwilidniw duuwd dsofjsd sufefdi fjdfpo esfhioe efejhf uadl asdnm  adasd d sndisd wjdopwadn oawdjoasnaodmosd ;owd lwilidniw duuwd dsofjsd sufefdi fjdfpo esfhioe efejhf uadl asdnm  adasd d sndisd wjdopwadn oawdjoasnaodmosd ;owd lwilidniw duuwd dsofjsd sufefdi fjdfpo esfhioe efejhf uadl asdnm  adasd </p>
                    </div>


                    <div className="text-after-heading-image structure-images" style={{paddingBottom:"3rem"}}>
                        <img src={Bg2} className="img-fluid" alt="screen capture codes"/>
                    </div>

                    {/* <div className="text-header">
                         <h4 className="fw-bold fs-5"><p>{unitContent.content.text_heading}</p></h4>
                    </div>
                    <div className="text-body">
                         <p>{unitContent.content.section_text}</p>
                    </div> */}
                </div>
                <div style={{marginTop:"2rem"}}></div>
                {/* <SecondUnitFooter direction="fkladn andka ajndakj dksa"/> */}
                <ThirdFooter destination="fkladn andka ajndakj dksa" />
                {/* <div className="units-dashboard-footer-wrapper">
                     <FooterSection footer_text="Units content" />
                 </div> */}
            </div>
        </>
    )
}

export default StructureThreeContent;