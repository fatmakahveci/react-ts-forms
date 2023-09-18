"use client";

const BasicForm = (): JSX.Element => {
  return (
    <form>
      <div className="control-group">
        <div className="form-control">
          <label htmlFor="name">First Name
            <input type="text" id="firstName" />
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="name">Last Name
            <input type="text" id="lastName" />
          </label>
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="name">E-Mail Address
            <input type="text" id="emailAddress" />
        </label>
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};
export default BasicForm;
