import React, { useState, useEffect, useContext }  from "react";
import "../admin.css";
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom';
import Services from "../components/services";
import axios from "axios";
import {API} from '../../config'
import EmptyPageContent from "../../CommonPageContents/EmptyPageContent";
import Loader from "../../CommonPageContents/Loader";
import SearchBar from "../components/SearchBar";


function ServicesContent(){
    const navigate = useNavigate(); 
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`${API}/service`).then(({data})=>{
            setService(data.data)
            setLoading(false)
        }).catch((err)=>{
            setLoading(false)
        })

    }, [refresh]);

    console.log("service:", service)

    const moveTo = () => {
        localStorage.setItem('redirectaddserv', true);
        navigate("/addservice");
    }
    return(
        <>
            {loading ?
                <Loader/>
                :
                <main className="px-md-4 wrapper2 dashboard-pages" style={{paddindTop:"1rem"}}>
                    <SearchBar location="Cours"/>
                    <div className="product-status mg-b-15 clients-product-status addservice">
                        <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="product-status-wrap drp-lst" style={{background:'#f6f8fa'}}>
                                    <div className="add-product">
                                            <h4 style={{color:'gray'}}></h4>
                                            <a onClick={moveTo} href="#" style={{background:'#4ab2cc'}}>Ajouter des cours</a>
                                        </div>
                                    <div className="asset-inner">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    {service.length == 0?
                    <EmptyPageContent text="Oopps!!! no services have been added" directives="Click on the add service button above to add a service."/>
                    :

                    <div className="wrapper3 services_wrapper servicess" style={{marginTop:"2.2rem", marginLeft:"0rem"}}>
                    {/* {service.map(serviceData => <NotSubscribedServices key={serviceData._id} id={serviceData._id} service_name={serviceData.name} service_amount={serviceData.amount} number_of_subscribers={serviceData.subscribers} short_description={serviceData.description}/>)} */}
                        {service.map((serviceData, index) => <Services key={serviceData._id} service_id={serviceData._id} service_name={serviceData.name} service_amount={serviceData.amount} index={index} number_of_subscribers={serviceData.subscribers} image={serviceData.image} display="admin" short_description={serviceData.description} refresh={refresh} setRefresh={setRefresh} />)}
                    </div>
                    }
                   <div style={{marginRight:"-1rem"}}><Footer/></div>
                </main>
            }

        </>
    )
}

export default ServicesContent;