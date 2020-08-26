import React from 'react';
import './char-details.css';

const CharDetails = () => {
    return (
      <div className="char-details rounded">
          <h4>John Snow</h4>
          <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                  <span className="term">Gender</span>
                  <span>male</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                  <span className="term">Born</span>
                  <span>1783</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                  <span className="term">Died</span>
                  <span>1820</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                  <span className="term">Culture</span>
                  <span>First</span>
              </li>
          </ul>
      </div>
    )
}

export default CharDetails;