import {Header} from "../components/product-page-components/Header";
import "../styles/App.css";
import {BottomMenu} from "../components/product-page-components/BottomMenu";
import Comments from "./comments/Comments";

export function Reviews(){

    return (
      <div>
          <div>
              <Header />
              <Comments currentUserId={sessionStorage.getItem("id")} />
              <BottomMenu />
          </div>
      </div>
    );
}