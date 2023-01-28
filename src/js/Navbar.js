import './navbar.css'

export default function Navbar() {
    return (
        <>
         <div class="navbar">
                <header>
                    {/* <a href="https://www.vecteezy.com/free-vector/pig-coin">Pig Coin Vectors by Vecteezy</a> */}
                    <a href='#'><img src='../public/budget-logo.jpg' /></a>
                </header>
                <section class="top_link">
                    <a href="#">Position Summary</a>
                </section>
                <section class="overview">
                    {/* Need to iterate for each currency saved in user's database: */}
                    <p>USD</p> {/* Access currency name */}
                    <ul>
                        <li><a href="#">Budget</a></li>
                        <li><a href="#">Checking 1</a></li>
                        <li><a href="#">Checking 2</a></li>
                        <li><a href="#">Savings</a></li>
                    </ul>
                </section>
                <section class="bottom_links">
                    <a href="#">Settings</a>
                </section>    
                <section class="logout">
                    {/* <button type='button' onClick={signOut}>Sign Out</button> */}
                </section>
            </div> 
        </>
    )
}