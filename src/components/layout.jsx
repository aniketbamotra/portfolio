import React from "react"
import "./globalStyle.css"

export default function Layout({ children }) {
  return <div className="grid-container">{children}</div>
}