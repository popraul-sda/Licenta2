export function MenuContainer({link, icon}){
    return(
      <li>
          <a href={link}>
              <span className="icon">{icon}</span>
          </a>
      </li>
    );
}