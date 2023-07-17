
import './App.css'
import React, { useEffect, useState } from 'react';

function App() {
  const [transferencias, setTransferencias] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [saldoPeriodo, setSaldoPeriodo] = useState(0);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [nomeOperador, setNomeOperador] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    fetchTransferencias();
    fetchSaldoTotal();
  }, []);


  const fetchTransferencias = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/transferencias');
      if (response.ok) {
        const data = await response.json();
        setTransferencias(data);

        let saldo = 0;
        data.forEach(transferencia => {
          saldo += transferencia.valor;
        });
        setSaldoPeriodo(saldo.toFixed(2));
      } else {
         
        console.error('Erro ao buscar transferências:', response.status);
      }
    } catch (error) {
 
      console.error('Erro ao buscar transferências:', error);
    }
  };

  const fetchSaldoTotal = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/transferencias/saldo-total');
      if (response.ok) {
        const saldoTotal = await response.json();
        setSaldoTotal(saldoTotal);
      } else {
       
        console.error('Erro ao buscar saldo total:', response.status);
      }
    } catch (error) {
     
      console.error('Erro ao buscar saldo total:', error);
    }
  };

  const fetchTransferenciasPeriodo = async () => {
    let url = 'http://localhost:8080/api/transferencias/periodo';

    if (dataInicio) {
      url += `?periodoInicio=${dataInicio}T00:00:00`;
    }

    if (dataFim) {
      if (dataInicio) {
        url += `&periodoFim=${dataFim}T00:00:00`;
      } else {
        url += `?periodoFim=${dataFim}T00:00:00`;
      }
    }

    if (nomeOperador) {
      if (dataInicio || dataFim) {
        url += `&nomeOperador=${nomeOperador}`;
      } else {
        url += `?nomeOperador=${nomeOperador}`;
      }
    }

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTransferencias(data);

        let saldo = 0;
        data.forEach(transferencia => {
          saldo += transferencia.valor;
        });
        setSaldoPeriodo(saldo.toFixed(2));
        console.log(url);
        console.log(saldo);
      } else {
         
        console.error('Erro ao buscar transferências por período:', response.status);
      }
    } catch (error) {
      
      console.error('Erro ao buscar transferências por período:', error);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (dataInicio || dataFim || nomeOperador) {
      fetchTransferenciasPeriodo();
    } else {
      fetchTransferencias();
      setSaldoPeriodo(0);
    }

    resetInputs();
  };

  const resetInputs = () => {
    setDataInicio('');
    setDataFim('');
    setNomeOperador('');
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transferencias.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className="container" >
        <form onSubmit={handleSubmit} id="myForm"   >
          <div className='container-into  border'  >
            <div className="form-group">
              <label htmlFor="data-inicio">Data de Início:</label>
              <input
                type="date"
                className="form-control"
                id="data-inicio"
                value={dataInicio}
                onChange={e => setDataInicio(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="data-fim">Data de Fim:</label>
              <input
                type="date"
                className="form-control"
                id="data-fim"
                value={dataFim}
                onChange={e => setDataFim(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nome-operador">Nome do Operador Transacionado:</label>
              <input
                type="text"
                className="form-control"
                id="nome-operador"
                value={nomeOperador}
                onChange={e => setNomeOperador(e.target.value)}
              />
            </div>
          </div>
          <div className=' formsB' >
            <button type="submit" form="myForm" className="btn btn-primary">
              Pesquisar
            </button>
          </div>
        </form>

        <div className="table-container  border  ">
          <div className='table-saldos' >
            <h4>Saldo total: {saldoTotal}</h4>
            <span style={{ width: '3rem' }}></span>
            <h4>Saldo no período: {saldoPeriodo}</h4>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Data de Transferência</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th>Nome do Operador Transacionado</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map(transferencia => (
                  <tr key={transferencia.id}>
                    <td>{transferencia.dataTransferencia ? transferencia.dataTransferencia.replace(/^(\d{4})-(\d{2})-(\d{2}).*/, '$3/$2/$1') : ''}</td>
                    <td>{transferencia.valor}</td>
                    <td>{transferencia.tipo}</td>
                    <td>{transferencia.nomeOperadorTransacao}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Nenhuma transferência encontrada</td>
                </tr>
              )}
            </tbody>
          </table>



          <nav aria-label="Page navigation" >
            <ul className="pagination justify-content-center">
              {transferencias.length > 0 && (
                <React.Fragment>
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                      Anterior
                    </button>
                  </li>
                  {Array.from({ length: Math.ceil(transferencias.length / itemsPerPage) }, (_, index) => (
                    <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index + 1}>
                      <button className="page-link" onClick={() => paginate(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === Math.ceil(transferencias.length / itemsPerPage) ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                      Próxima
                    </button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </div>

      </div>


    </>
  )
}

export default App
