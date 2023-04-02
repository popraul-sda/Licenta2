import {ChevronRightRounded} from "@mui/icons-material";

export function SubMenuContainer({name}){
    return (
      <div className="subMenuContainer">
        <h3>{name}</h3>
        <div className="viewAll">
            <p>View All</p>
            <i><ChevronRightRounded /></i>
        </div>
      </div>
    );
}