import React, {useState, useEffect} from 'react';
import './App.css';
import { getUsers, getUserById, addUser, updateUser, deleteUser } from './services/userService';

function App() {

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({nom: '', prenom: '', telephone: '', email: ''});
  const [editingId, setEditingId] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');



  const fetchUsers = async () => {
    try {
      setError('');
      const data = await getUsers();
      console.log(data);
      setUsers(data);
    } catch (err) {
      setError('Ere nan afiche users');
    }
  }

  const fetchUserById = async () => {
    if (!setSearchId) return fetchUsers();
    try {
      setError('');
      const data = await getUserById(searchId);
      setUsers([data]);
    } catch {
      setUsers([]);
      setError('utilisateur non trouve');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateUser(editingId, form);
        setEditingId(null);
      } else {
        await addUser(form);
      }
      setForm({ nom: '', prenom: '', telephone: '', email: ''});
      fetchUsers();
    } catch {
      setError('Utilisateur ne peut enregistrer');
    }
  };

  const handleEdit = (user) => {
    setForm({nom: user.nom, prenom: user.prenom, telephone: user.telephone, email: user.email});
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };


  return (
    <div className="App">
     <h1 className=''>Users list</h1>

     <div className="search">
      <input type="number" placeholder="check by Id" value={searchId} onChange={(e) => setSearchId(e.target.value)}/>
      <button onClick={fetchUserById}>Recherche avec id</button>
     </div>
     {error && <p className="error">{error}</p>}

     <form className="user-form" onSubmit={handleSubmit}>
      <input placeholder="Nom" value={form.nom} onChange={(e) => setForm({...form, nom: e.target.value})} required />
      <input placeholder="Prenom" value={form.prenom} onChange={(e) => setForm({...form, prenom: e.target.value})} required />
      <input placeholder="Telephone" value={form.telephone} onChange={(e) => setForm({...form, telephone: e.target.value})} required />
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />

      <div className="buttons">
        <button type="submit">{editingId ? 'Editer' : 'Ajouter'}</button>
        {editingId && (
          <button type="button" className="cancel" onClick={() => {
            setEditingId(null);
            setForm({nom: '', prenom: '', telephone: '', email: ''});
          }}>Annuler</button>
        )}

      </div>
     </form>

     <div className="table-wrapper">
         <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Telephone</th>
              <th>Email</th>
              <th>Date Creation</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.telephone}</td>
                <td>{user.email}</td>
                <td>{user.date_creation}</td>
                <td>
                  <button className='' onClick={() => handleEdit(user)}>Editer</button>
                  <button className='' onClick={() => handleDelete(user.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
         </table>
     </div>
    </div>
  );
}

export default App;

