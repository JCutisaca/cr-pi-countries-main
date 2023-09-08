const { DataTypes } = require('sequelize');
const { Activity } = require('../src/db');
const attributes = Activity.getAttributes();


describe('El modelo Activity', () => {
    it('Debe haber sido creado correctamente y con el nombre correcto', () => {
        expect(Activity).toBeDefined();
    });

    describe('Los atributos del modelo...', () => {
        
        it('id: El id tiene que ser un numero entero unico no puede ser nulo y debe ser unico.', () => {
            expect(attributes.id.type instanceof DataTypes.INTEGER).toBe(true);
            expect(attributes.id.allowNull).toBe(false);
            expect(attributes.id.primaryKey).toBe(true);
            expect(attributes.id.unique).toBe(true);
        });
        
        it('name: Un nombre de Actividad, de tipo string y no puede ser nulo.', () => {
            expect(attributes.name.type instanceof DataTypes.STRING).toBe(true);
            expect(attributes.name.allowNull).toBe(false);
        });


        it('dificultad: Debe ser de tipo string.', () => {
            expect(attributes.dificultad.type instanceof DataTypes.STRING).toBe(true);
        });

        it('duracion: Debe ser de tipo string.', () => {
            expect(attributes.duracion.type instanceof DataTypes.STRING).toBe(true);
        });

        it('temporada: Un array de tipo ENUM y no puede ser nulo.', () => {
            expect(attributes.temporada.type instanceof DataTypes.ARRAY).toBe(true);
            const elementType = attributes.temporada.type.options.type;
            expect(elementType.key).toBe('ENUM'); 
            expect(attributes.temporada.allowNull).toBe(false); 
        });
    });
});