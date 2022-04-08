import './App.css'

export default function App() {
  function Message(props) {
    const id = props.id
    const text = props.text
    const user = props.user
    const className = `message id(${id})`

    return (
      <div className={className}>
        <strong>{user}</strong>
        <p>{text}</p>
      </div>
    )
  }

  return (
    <div className="App">
      <Message id="80423fj90e8dk" user="Usuario 1" text="Olá como vai?"></Message>
      <Message id="80423fj90e8dk" user="Usuario 2" text="Otimo! e você?"></Message>
    </div>
  )
}
