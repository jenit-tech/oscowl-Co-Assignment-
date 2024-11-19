import {Component} from 'react'
import UserManagementDashboard from '../UserManagementDashboard'




import './index.css'



class Home extends Component  {
    render()  {
        return (
            <div className="app-container">
            <div className="app-card">
              <h1 className="heading">User Management Dashboard</h1>
              <UserManagementDashboard />
              </div>
              </div>
        
        
        
        
            
         
        )

    }

} 

export default Home