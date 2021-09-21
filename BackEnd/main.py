#Server: localhos:5000
#Importaciones de Flask
from flask import Flask,request,jsonify
from flask_cors import CORS
from Gestor import Gestor

#Crear la app
app = Flask(__name__)
app.config["DEBUG"] = True

CORS(app)

gestor =  Gestor()


# EndPoints
@app.route('/',methods=['GET'])
def home():
    return 'Funciona esta Mierda UwU'


#USUARIOS
@app.route('/usuarios',methods=['POST'])
def crearUsuario():
    dato = request.json
    gestor.crearUsuario(dato['nombre'],dato['apellido'],dato['contraseña'],dato['usuario'],dato['correo'])
    return '{"Estado":"Usuario Creado"}'


@app.route('/obtenerusuarios')
def obtener_usuarios():
    return gestor.obtener_usuarios()


#COMENTARIOS
@app.route('/comentarios',methods=['POST'])
def crearcomentario():
    dato = request.json
    gestor.crearComentario(dato['nameestudiante'],dato['cc'],dato['mensaje'],dato['fecha'])
    return '{"Estado":"Comentario Creado"}'


@app.route('/obtenercomentarios')
def obtener_comentarios():
    return gestor.obtener_comentarios()







@app.route('/enfermeros/<nombree>/<usere>',methods=['DELETE'])
def eliminar_enfermero(nombree,usere):
    if(gestor.eliminar_enfermero(nombree,usere)):
        return '{"Enfermero":"Eliminado"}'
    return '{"data":"Error"}'

# @app.route('/enfermeros/<mnombree>',methods=['PUT'])
# def actualizarenfermero(mnombree):
#     datom = request.json
#     if gestor.actualizar_enfermero(mnombree,datom['nombree'],datom['apellidoe'],datom['fechae'],datom['sexoe'],datom['usere'],datom['passworde'],datom['tele']):
#         return '{"data":"Actualizado"}'
#     return '{"data":"Error"}'



@app.route('/login/<user>/<password>')
def login(user,password):
    print('entra')
    return gestor.iniciar_sesion(user,password)



@app.route('/registro',methods=['POST'])
def registrard():
    dato = request.json
    gestor.registrar_usuario(dato['nombre'],dato['apellido'],dato['password'],dato['user'])    
    return '{"data":"Creado"}'




#INICIAR EL SERVIDOR
if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)

