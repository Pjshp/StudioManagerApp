import {getInitials} from "../Utils/helper.jsx";
import {getUserData} from "../Utils/axios_helper.jsx";
import PropTypes from "prop-types";

const ProfileInfo = ({ onLogout }) => {
    const userData = getUserData();

    return (
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
                {getInitials(userData?.name)}
            </div>

            <div>
                <p className="text-sm font-medium">{userData?.name}</p>
                    <button className="text-sm text-slate-700 underline" onClick={onLogout}>
                        Wyloguj
                    </button>
            </div>
        </div>
    )
}

ProfileInfo.propTypes = {
    onLogout: PropTypes.func.isRequired,
}

export default ProfileInfo;