import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../context';
import StyledHero from '../components/StyledHero';
import {FaSignInAlt,FaSignOutAlt} from 'react-icons/fa';
export class SingleRoom extends Component {

    constructor(props){
        super(props);
        //console.log(this.props);
        this.state={
            slug:this.props.match.params.slug,
            defaultBcg
        };
    }
    static contextType = RoomContext;
    render() {

        const {getRoom} = this.context;
        const room =getRoom(this.state.slug);
        //console.log(room);
        if(!room){
            return (<div className="error">
                <h3>No such room could be found</h3>
                <Link to="/rooms" className="btn-primary">
                    back to rooms
                </Link>
            </div>
            );
        }

        const {name,description,capacity,size,price,extras,breakfast,pets,images,checkin,checkout} = room;
        const [mainImg,...defaultImg] =images;  //array destructuring of image array
        return (
            <>
            <StyledHero img={mainImg || this.state.defaultBcg}>
                <Banner title={`${name} room`}>
                    <Link to="/rooms" className="btn-primary">back to rooms</Link>
                </Banner>
            </StyledHero>
            <section className="single-room">
                <div className="single-room-images">
                {defaultImg.map((item,index)=>{
                    return <img key={index} src={item} alt={name} className="resonsive_img"/>
                })}
                </div>

                <div className="single-room-info">
                    <article className="desc">
                    <div class="ui blue label">
                        <h3>details</h3>
                    </div>
                        <p>{description}</p>
                    </article>
                    <article className="info">

                    <div class="ui blue label">
                        <h3>info</h3>
                    </div>

                       
                        <h6 className="first">price:${price}</h6>
                        <h6>size:{size} SQFT</h6>
                        <h6>max capacity:{capacity>1?`${capacity} people`:`${capacity} person`}</h6>
                        <h6>{pets ? "pets allowed":"no pets allowed"}</h6>
                        <h6>{breakfast ? "breakfast included":""}</h6>
                        <div class="ui red labels">
                            <div class="ui label lab">
                                <FaSignInAlt className="check"/>{checkin} PM
                            </div>
                        
                            <div class="ui label lab">
                                <FaSignOutAlt className="check"/>{checkout} AM
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <section className="room-extras">

            <div class="ui blue label">
                <h3>Extras</h3>
            </div>
                <ul className="extras">
                {extras.map((item,index)=>{
                    return <li key={index}>- {item}</li> 
                })}
                </ul>
            </section>
            </>
        )
    }
}

export default SingleRoom
