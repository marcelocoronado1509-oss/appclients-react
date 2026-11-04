
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClientsService } from '../services/ClientsService';

export default function ClientsPage() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadClients = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await ClientsService.getClients();

            console.log('Clientes recibidos:', data);

            setClients(data || []);
        } catch (err) {
            console.error('Error al cargar clientes:', err);
            setError('No se pudieron cargar los clientes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadClients();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Clientes</h2>

            <Link
                to="/new-client"
                className="btn btn-primary mb-3"
            >
                Nuevo Cliente
            </Link>

            {loading && <p>Cargando clientes...</p>}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!loading && !error && clients.length === 0 && (
                <p>No hay clientes registrados.</p>
            )}

            {!loading && !error && clients.length > 0 && (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.phone}</td>
                                <td>...</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
