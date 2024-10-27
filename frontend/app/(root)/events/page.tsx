export default async function Page() {
  const res = await fetch('http://localhost:8000/test');

  const response = await res.json();
  return (
    <div>
      Events
      <div>{JSON.stringify(response)}</div>
    </div>
  );
}
