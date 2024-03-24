function ATMDeposit({ onChange, isDeposit, isValid }) {
  const choice = ['Deposit', 'Cash Back'];
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
    </label>
  );
}

function Account() {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
const handleChange = (event) => {
  console.log(`handleChange ${event.target.value}`);
  const amount = Number(event.target.value);
  setDeposit(amount);
  
  if (amount <= 0) {
    setValidTransaction(false);
  } else if (atmMode === "Cash Back" && amount > totalState) {
    setValidTransaction(false);
    // Display an alert if attempting to withdraw more than the account balance
    alert("Not enough money!");
  } else {
    setValidTransaction(true);
  }
};

  
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    event.preventDefault();
    setDeposit(0); // Reset deposit after submission
    setValidTransaction(false); // Reset transaction validity
  };

  const handleModeSelect = (event) => {
    const mode = event.target.value;
    setAtmMode(mode);
    if (mode === "Deposit") {
      setIsDeposit(true);
      setValidTransaction(false); // Reset validation when changing mode
    } else if (mode === "Cash Back") {
      setIsDeposit(false);
      setValidTransaction(deposit <= totalState && deposit > 0); // Check validation for existing deposit value
    } else {
      setValidTransaction(false); // Ensure validation is reset for empty mode
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">ATM</h5>
          <h6 className="card-subtitle mb-2 text-muted" id="total">{status}</h6>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="mode-select">Select an action below to continue</label>
              <select className="form-control" onChange={handleModeSelect} name="mode" id="mode-select">
                <option id="no-selection" value=""></option>
                <option id="deposit-selection" value="Deposit">Deposit</option>
                <option id="cashback-selection" value="Cash Back">Cash Back</option>
              </select>
            </div>
            {atmMode && (
              <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction} />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Account />, document.getElementById('root'));



// const Account = () => {
//   const [deposit, setDeposit] = React.useState(0);
//   const [totalState, setTotalState] = React.useState(0);
//   const [isDeposit, setIsDeposit] = React.useState(true);
//   const [atmMode, setAtmMode] = React.useState("");
//   const [validTransaction, setValidTransaction] = React.useState(false);

//   let status = `Account Balance $ ${totalState} `;
//   const handleChange = (event) => {
//     console.log(`handleChange ${event.target.value}`);
//     setDeposit(Number(event.target.value));
//   };

//   const handleSubmit = (event) => {
//     let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
//     setTotalState(newTotal);
//     event.preventDefault();
//   };

//   const handleModeSelect = (event) => {
//     const mode = event.target.value;
//     setAtmMode(mode);
//     if (mode === "Deposit") {
//       setIsDeposit(true);
//     } else if (mode === "Cash Back") {
//       setIsDeposit(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2 id="total">{status}</h2>
//       <label>Select an action below to continue</label>
//       <select onChange={handleModeSelect} name="mode" id="mode-select">
//         <option id="no-selection" value=""></option>
//         <option id="deposit-selection" value="Deposit">Deposit</option>
//         <option id="cashback-selection" value="Cash Back">Cash Back</option>
//       </select>
//       {
//         atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>
//       }
//     </form>
//   );
// };









// const ATMDeposit = ({ onChange, isDeposit }) => {
//   const choice = ['Deposit', 'Cash Back'];
//   console.log(`ATM isDeposit: ${isDeposit}`);
//   return (
//     <label className="label huge">
//       <h3> {choice[Number(!isDeposit)]}</h3>
//       <input id="number-input" type="number" width="200" onChange={onChange}></input>
//       <input type="submit" width="200" value="Submit" id="submit-input"></input>
//     </label>
//   );
// };

// const Account = () => {
//   const [deposit, setDeposit] = React.useState(0);
//   const [totalState, setTotalState] = React.useState(0);
//   const [isDeposit, setIsDeposit] = React.useState(true);

//   let status = `Account Balance $ ${totalState} `;
//   console.log(`Account Rendered with isDeposit: ${isDeposit}`);
//   const handleChange = (event) => {
//     console.log(`handleChange ${event.target.value}`);
//     setDeposit(Number(event.target.value));
//   };
//   const handleSubmit = (event) => {
//     let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
//     setTotalState(newTotal);
//     setValidTransaction(false);
//     event.preventDefault();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2 id="total">{status}</h2>
//       <button onClick={() => setIsDeposit(true)}>Deposit</button>
//       <button onClick={() => setIsDeposit(false)}>Cash Back</button>
//       <ATMDeposit onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>
//     </form>
//   );
// };
// // ========================================
// ReactDOM.render(<Account />, document.getElementById('root'));
