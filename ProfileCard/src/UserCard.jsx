import './Profile.css'


function User(props){
    return (
    <div className="card-container">
        <span className={props.online ? "pro-online": "pro-offline"}>{props.online ? "Online" : "Offline"}</span>
        <img src={props.profile}alt="user" className="photo"/>
        <h3><span className='username'>Ig : </span>Phenomenal_Ajay</h3>
        <h3><span className='role'>Role :</span>FullStack Developer</h3>
        <div>
            <button onClick={() => window.location.href = "https://www.instagram.com/Phenomenal_ajay/#"}>Message</button>

        </div>
    </div>
    );
}
export const UserCard = () => {
  return (
    <div>
        <User  online={false} profile="src/assets/images/ajay.jpg"/>
    </div>
  )
}
