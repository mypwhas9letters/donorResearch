import React from 'react';

const ChartData = (contribution) => {
  return (
    <tr key={contribution.sub_id}>
      <td>{contribution.contributor_first_name}</td>
      <td>{contribution.contributor_last_name}</td>
      <td>{contribution.contributor_state}</td>
      <td>{contribution.contributor_city}</td>
      <td>{contribution.contributor_zip ? contribution.contributor_zip.slice(0,5) : "N/A"}</td>
      <td>{contribution.contributor_aggregate_ytd}</td>
      <td>{contribution.contribution_receipt_amount}</td>
      <td>{contribution.committee.name}</td>
      <td>{contribution.committee.state}</td>
      <td>{contribution.memo_text}</td>
      <td>{contribution.contribution_receipt_date.split("T")[0]}</td>
      <td>{contribution.contributor_occupation}</td>
      <td>{contribution.contributor_employer}</td>
      <td>{contribution.pdf_url}</td>
    </tr>
  );
}

export default ChartData;
