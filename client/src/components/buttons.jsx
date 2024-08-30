export function LinkButton({ text, link, classNme, linkClass }) {
  return (
    <>
      <button className={classNme}>
        {" "}
        <a href={link} className={linkClass}>
          {text ? text : "Click Here"}{" "}
          <span className="material-symbols-outlined ml-4">arrow_forward</span>
        </a>
      </button>
    </>
  );
}

export function ClickButton({ text, click, classNme }) {
  return (
    <button
      className={`${classNme} std-button justify-center content-center bg-yellow`}
      onClick={click}
    >
      {text ? text : "Click Here"}{" "}
      <span className="material-symbols-outlined ml-4">arrow_forward</span>
    </button>
  );
}

export function SmallButton({ text, click, disabled }) {
  return (
    <div className="flex justify-end ml-auto">
      <button
        className="sml-button justify-center content-center"
        onClick={click}
        disabled={disabled}
      >
        {text ? text : "Click Here"}{" "}
        <span className="material-symbols-outlined ml-4">arrow_forward</span>
      </button>
    </div>
  );
}

export function SmallBackButton({ text, click, disabled }) {
  return (
    <div className="flex justify-end">
      <button
        className="sml-button justify-center content-center mt-4"
        onClick={click}
        disabled={disabled}
      >
        <span className="material-symbols-outlined ml-4">arrow_back</span>{" "}
        {text ? text : "Click Here"}{" "}
      </button>
    </div>
  );
}

export function SmallSubmitButton({ text, click, disabled }) {
  return (
    <div className="flex justify-end ml-auto">
      <button
        type="submit"
        className="sml-button justify-center content-center mt-4"
        onClick={click}
        disabled={disabled}
      >
        {text ? text : "Click Here"}{" "}
        <span className="material-symbols-outlined ml-4">arrow_forward</span>
      </button>
    </div>
  );
}
