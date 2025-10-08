import chefClaudeLogo from "./images/logo.png"

export default function Header(){
    return(
        <header>
            <img src={chefClaudeLogo} />
            <h1>Chef Claude</h1>
        </header>
    )
}