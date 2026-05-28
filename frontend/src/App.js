import { useEffect, useState } from 'react';

function App() {

  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {

    fetch('http://127.0.0.1:8000/api/emissions/')
      .then(response => response.json())
      .then(data => {
        setRecords(data);
      });

  }, []);

  const filteredRecords = records.filter((record) => {

    if (filter === 'FLAGGED') {
      return record.flagged;
    }

    if (filter === 'PENDING') {
      return record.status === 'PENDING';
    }

    if (filter === 'APPROVED') {
      return record.status === 'APPROVED';
    }

    return true;
  });

  const totalRecords = records.length;

  const flaggedRecords = records.filter(
    (record) => record.flagged
  ).length;

  const pendingRecords = records.filter(
    (record) => record.status === 'PENDING'
  ).length;

  const refreshRecords = () => {

  fetch('http://127.0.0.1:8000/api/emissions/')
    .then(response => response.json())
    .then(data => {
      setRecords(data);
    });

};


const approveRecord = (id) => {

  fetch(
    `http://127.0.0.1:8000/api/emissions/${id}/approve/`,
    {
      method: 'POST'
    }
  )
    .then(() => {
      refreshRecords();
    });

};


const rejectRecord = (id) => {

  fetch(
    `http://127.0.0.1:8000/api/emissions/${id}/reject/`,
    {
      method: 'POST'
    }
  )
    .then(() => {
      refreshRecords();
    });

};

  return (

    <div
      style={{
        backgroundColor: '#f1f5f9',
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif'
      }}
    >

      <div
        style={{
          maxWidth: '1300px',
          margin: '0 auto'
        }}
      >

        <div style={{ marginBottom: '40px' }}>

          <h1
            style={{
              color: '#1e3a8a',
              fontSize: '42px',
              marginBottom: '12px'
            }}
          >
            ESG Emissions Dashboard
          </h1>

          <p
            style={{
              color: '#475569',
              fontSize: '18px',
              maxWidth: '800px',
              lineHeight: '1.6'
            }}
          >
            Monitor emissions data from multiple enterprise sources,
            identify suspicious records, and manage analyst review workflows
            through a centralized ESG monitoring platform.
          </p>

        </div>

        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}
        >

          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              width: '280px',
              flex: '1',
minWidth: '260px',
transition: '0.3s',
              borderRadius: '14px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>
              Total Records
            </h3>

            <p
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#1e293b'
              }}
            >
              {totalRecords}
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              width: '280px',
              flex: '1',
minWidth: '260px',
transition: '0.3s',
              borderRadius: '14px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>
              Flagged Records
            </h3>

            <p
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#dc2626'
              }}
            >
              {flaggedRecords}
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              width: '280px',
              flex: '1',
minWidth: '260px',
transition: '0.3s',
              borderRadius: '14px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>
              Pending Reviews
            </h3>

            <p
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#d97706'
              }}
            >
              {pendingRecords}
            </p>
          </div>

        </div>

        <div style={{ marginBottom: '24px' }}>

          <button
            onClick={() => setFilter('ALL')}
            style={{
              padding: '12px 18px',
              marginRight: '12px',
              border: 'none',
              borderRadius: '10px',
              transition: '0.2s',
boxShadow:
  filter === 'ALL'
    ? '0 4px 10px rgba(0,0,0,0.15)'
    : 'none',
              backgroundColor:
                filter === 'ALL' ? '#1d4ed8' : '#93c5fd',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            All Records
          </button>

          <button
            onClick={() => setFilter('FLAGGED')}
            style={{
              padding: '12px 18px',
              marginRight: '12px',
              border: 'none',
              borderRadius: '10px',
              transition: '0.2s',
boxShadow:
  filter === 'FLAGGED'
    ? '0 4px 10px rgba(0,0,0,0.15)'
    : 'none',
              backgroundColor:
                filter === 'FLAGGED' ? '#b91c1c' : '#fca5a5',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Flagged
          </button>

          <button
            onClick={() => setFilter('PENDING')}
            style={{
              padding: '12px 18px',
              marginRight: '12px',
              transition: '0.2s',
boxShadow:
  filter === 'PENDING'
    ? '0 4px 10px rgba(0,0,0,0.15)'
    : 'none',
              border: 'none',
              borderRadius: '10px',
              backgroundColor:
                filter === 'PENDING' ? '#d97706' : '#fcd34d',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Pending
          </button>

          <button
            onClick={() => setFilter('APPROVED')}
            style={{
              padding: '12px 18px',
              border: 'none',
              borderRadius: '10px',
              transition: '0.2s',
boxShadow:
  filter === 'APPROVED'
    ? '0 4px 10px rgba(0,0,0,0.15)'
    : 'none',
              backgroundColor:
                filter === 'APPROVED' ? '#15803d' : '#86efac',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Approved
          </button>

        </div>

        <p
          style={{
            color: '#64748b',
            marginBottom: '20px',
            lineHeight: '1.6'
          }}
        >
          Flagged records indicate suspicious or invalid emissions data
          that may require analyst review before approval.
        </p>

        <div style={{ overflowX: 'auto' }}>

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'white',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}
          >

            <thead
              style={{
                backgroundColor: '#1e293b',
                color: 'white'
              }}
            >
              <tr>

                <th style={{ padding: '18px', textAlign: 'left' }}>
                  📦 Activity
                </th>

                <th style={{ padding: '18px', textAlign: 'left' }}>
                  🔢 Quantity
                </th>

                <th style={{ padding: '18px', textAlign: 'left' }}>
                  📏 Unit
                </th>

                <th style={{ padding: '18px', textAlign: 'left' }}>
                  🌍 Scope
                </th>

                <th style={{ padding: '18px', textAlign: 'left' }}>
                  📋 Status
                </th>

                <th style={{ padding: '18px', textAlign: 'left' }}>
                  ⚠️ Flagged
                </th>
                <th style={{ padding: '18px', textAlign: 'left' }}>
  ⚡ Actions
</th>

              </tr>
            </thead>

           <tbody>

  {filteredRecords.length === 0 ? (

    <tr>
      <td
        colSpan="7"
        style={{
          padding: '40px',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '18px'
        }}
      >
        No records found for selected filter.
      </td>
    </tr>

  ) : (

    filteredRecords.map((record, index) => (

      <tr
        key={record.id}
        style={{
          backgroundColor: record.flagged
            ? '#fee2e2'
            : index % 2 === 0
            ? '#ffffff'
            : '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          transition: '0.2s'
        }}
      >

        <td style={{ padding: '18px' }}>
          {record.activity_type}
        </td>

        <td style={{ padding: '18px' }}>
          {record.quantity}
        </td>

        <td style={{ padding: '18px' }}>
          {record.unit}
        </td>

        <td style={{ padding: '18px' }}>
          {record.scope}
        </td>

        <td
          style={{
            padding: '18px',
            fontWeight: 'bold',
            color:
              record.status === 'APPROVED'
                ? '#15803d'
                : record.status === 'REJECTED'
                ? '#dc2626'
                : '#d97706'
          }}
        >
          {record.status}
        </td>

        <td style={{ padding: '18px' }}>
          {record.flagged ? '⚠️ Yes' : 'No'}
        </td>
        <td style={{ padding: '18px' }}>

  {record.status === 'PENDING' ? (

    <div style={{ display: 'flex', gap: '10px' }}>

      <button
        onClick={() => approveRecord(record.id)}
        style={{
          backgroundColor: '#16a34a',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Approve
      </button>

      <button
        onClick={() => rejectRecord(record.id)}
        style={{
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Reject
      </button>

    </div>

  ) : record.status === 'APPROVED' ? (

    <span
      style={{
        color: '#15803d',
        fontWeight: 'bold'
      }}
    >
      Approved
    </span>

  ) : (

    <span
      style={{
        color: '#dc2626',
        fontWeight: 'bold'
      }}
    >
      Rejected
    </span>

  )}

</td>

      </tr>

    ))

  )}

</tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default App;