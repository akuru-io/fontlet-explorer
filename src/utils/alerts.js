const Alert = {
  success: (msg) => new Notification("Success!", {
    body: msg
  }),

  error: (msg) => new Notification("Error!", {
    body: msg
  })
};

export default Alert;