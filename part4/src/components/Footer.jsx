const Footer = () => {
    //määritellään footerille inline-tyylit
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    marginLeft: '20px'
  }

  return (
    <div style={footerStyle}>
      <br />
      <p>
        Note app, Department of Computer Science, 
        University of Helsinki 2026
      </p>
    </div>
  )
}

export default Footer