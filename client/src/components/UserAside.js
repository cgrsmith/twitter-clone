import React from "react";
import DefaultImage from "../images/default-profile-image.jpg";

const UserAside = props => {
    return (
        <aside className="userAside">
            <div>
                <img src={props.profileImageUrl || DefaultImage} alt={props.username} />
            </div>
        </aside>
    )
}

export default UserAside;