import "../styles/global.css"
function MyApp({ Component, pageProps }) {

    return <div className="text-slate-600 font-mono">
    <Component {...pageProps} />
    </div>
  }
  
  export default MyApp;