// import React, { useState } from 'react';

// function WaitTimeForm() {
//     const [features, setFeatures] = useState({
//         arrivalTime: '',
//         department: '',
//         doctorsAvailable: '',
//     });
//     const [waitTime, setWaitTime] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFeatures({
//             ...features,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const response = await fetch('http://localhost:3000/predict', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     features: [features.arrivalTime, features.department, features.doctorsAvailable],
//                 }),
//             });
//             const data = await response.json();
//             setWaitTime(data.wait_time);
//         } catch (error) {
//             console.error('Error fetching wait time:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Arrival Time:</label>
//                     <input
//                         type="text"
//                         name="arrivalTime"
//                         value={features.arrivalTime}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Department:</label>
//                     <input
//                         type="text"
//                         name="department"
//                         value={features.department}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Doctors Available:</label>
//                     <input
//                         type="text"
//                         name="doctorsAvailable"
//                         value={features.doctorsAvailable}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Predicting...' : 'Predict Wait Time'}
//                 </button>
//             </form>
//             {waitTime !== null && <p>fruntend src components Predicted Wait Time is : {waitTime} minutes</p>}
//         </div>
//     );
// }

// export default WaitTimeForm;

import React, { useState } from 'react';

function WaitTimeForm() {
    const [features, setFeatures] = useState({
        arrivalTime: '',
        department: '',
        doctorsAvailable: '',
    });
    const [waitTime, setWaitTime] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFeatures({
            ...features,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(features), // Send the features object directly
            });

            // Check if response is ok
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setWaitTime(data.wait_time);
        } catch (error) {
            console.error('Error fetching wait time:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Arrival Time:</label>
                    <input
                        type="text"
                        name="arrivalTime"
                        value={features.arrivalTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={features.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Doctors Available:</label>
                    <input
                        type="text"
                        name="doctorsAvailable"
                        value={features.doctorsAvailable}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Predicting...' : 'Predict Wait Time'}
                </button>
            </form>
            {waitTime !== null && <p>Predicted Wait Time: {waitTime} minutes</p>}
        </div>
    );
}

export default WaitTimeForm;
