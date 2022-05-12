import React from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, titulo: "BMW", responsable: "Carlos", fecha:"02/03/2022", descripcion:"Tomar en cuneta el número de serie de los autos individuales", place:"Madrid" },
  { id: 2, titulo: "AUDI", responsable: "Abraham",fecha:"02/03/2022",descripcion:"Verificar los autos en venta del año 2022", place:"Ciudad de México " },
  { id: 3, titulo: "NISSAN", responsable: "Melani",fecha:"02/03/2022",descripcion:"Verificar los vehiculos vendidos en el primer trimestre del año", place:"Reino Unido" },
  { id: 4, titulo: "MERCEDEZ", responsable: "Federico",fecha:"02/03/2022",descripcion:"Actualizar el chacis de los vehiculos en bodega", place:"Madrid" },
  { id: 5, titulo: "FORD", responsable: "Marcela",fecha:"02/03/2022",descripcion:"Capturar los nuevos autos en la agencia del sur", place:"Ciudad de México "},
  { id: 6, titulo: "volkswagen", responsable: "Jorge",fecha:"02/03/2022",descripcion:"Ampliar la fecha y los datos recolectados", place:"Reino Unido" },
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      titulo: "",
      responsable: "",
      fecha:"",
      descripcion:"",
      place:""
          },
         };

  mostrarModalVisualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalVisualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  visualizar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].titulo = dato.titulo;
        arreglo[contador].responsable = dato.responsable;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var valoracion;
    do{
      valoracion = prompt("Ingrese la valoración de la auditoria [1-100]");
      valoracion = parseInt(valoracion);
    }while(isNaN(valoracion));

    var opcion = window.confirm("Estas seguro que has terminado la auditoría "+dato.id);
    //alert("La valoración de la auditoria es: "+valoracion);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Programar una auditoria.</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titulo</th>
                <th>Responsable</th>
                <th>Fecha Iniciar</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.titulo}</td>
                  <td>{dato.responsable}</td>
                  <td>{dato.fecha}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalVisualizar(dato)}
                    >
                      Visualizar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}
                    
                    >
                      Finalizar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Visualizar Auditoria</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Titulo: 
              </label>
              <input
                className="form-control"
                readOnly
                name="titulo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.titulo}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Responsable: 
              </label>
              <input
                className="form-control"
                readOnly
                name="responsable"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.responsable}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Fecha para Iniciar: 
              </label>
              <input
                className="form-control"
                readOnly
                name="Fecha"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fecha}
              />
            </FormGroup>
            <FormGroup>
              <label>
              Descripción
              </label>
              <input
                className="form-control"
                readOnly
                name="Descripción"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.descripcion}
              />
            </FormGroup>
            <FormGroup>
              <label>
              Lugar del auditor
              </label>
              <input
                className="form-control"
                readOnly
                name="Place"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.place}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.visualizar(this.state.form)}
            >
              Regresar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalVisualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar titulo</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                titulo: 
              </label>
              <input
                className="form-control"
                name="titulo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                responsable: 
              </label>
              <input
                className="form-control"
                name="responsable"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Fecha para Iniciar: 
              </label>
              <input
                className="form-control"
                name="Fecha"
                type="text"
                onChange={this.handleChange}

              />
            </FormGroup>
            <FormGroup>
              <label>
              Descripción
              </label>
              <input
                className="form-control"
                name="Descripción"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
              Lugar del auditor
              </label>
              <input
                className="form-control"
                name="Place"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
