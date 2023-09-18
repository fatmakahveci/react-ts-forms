"use client";

const SimpleInput = (): JSX.Element => {
  return (
    <form>
      <div className="form-control">
        <label htmlFor="name">Your Name
            <input type="text" id="name" />
        </label>
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
