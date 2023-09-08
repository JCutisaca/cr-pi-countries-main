const { DataTypes } = require('sequelize');
const { sequelize, Country } = require('../src/db');
const attributes = Country.getAttributes();


describe('El modelo Country', () => {
    it('Debe haber sido creado correctamente y con el nombre correcto', () => {
        expect(Country).toBeDefined();
    });

    describe('Los atributos del modelo...', () => {
        it('name: Un nombre de pais, de tipo cadena de texto y no puede ser nulo y debe ser unico.', () => {
            expect(attributes.name.type instanceof DataTypes.STRING).toBe(true);
            expect(attributes.name.allowNull).toBe(false);
            expect(attributes.name.unique).toBe(true);
        });

        it('id: El id tiene que ser de tipo cadena de texto con longitud de 3 caracteres y no puede ser nulo y debe ser la clave primaria.', () => {
            expect(attributes.id.type instanceof DataTypes.STRING).toBe(true);
            expect(attributes.id.allowNull).toBe(false);
            expect(attributes.id.primaryKey).toBe(true);
            expect(attributes.id.type.options.length).toBe(3);
        });

        it('flag: Un string que representa la bandera del pais y no puede ser nulo.', () => {
            expect(attributes.flag.type instanceof DataTypes.STRING).toBe(true);
            expect(attributes.flag.allowNull).toBe(false);
        });

        it('continents: Un array de strings que representa los continentes a los que pertenece el pais, no puede ser nulo.', () => {
            expect(attributes.continents.type instanceof DataTypes.ARRAY).toBe(true);
            expect(elementType.key).toBe('STRING');
            expect(attributes.continents.allowNull).toBe(false);
        });

        it('capital: Un array de strings que representa las capitales del pais, no puede ser nulo.', () => {
            expect(attributes.capital.type instanceof DataTypes.ARRAY).toBe(true);
            const elementType = attributes.capital.type.options.type;
            expect(elementType.key).toBe('STRING'); 
            expect(attributes.capital.allowNull).toBe(false); 
        });

        it('subregion: Un string que representa la subregión a la que pertenece el pais y no puede ser nulo.', () => {
            expect(attributes.subregion.type instanceof DataTypes.STRING).toBe(true);
            expect(attributes.subregion.allowNull).toBe(false);
        });

        it('area: Un número entero que representa el area del pais, no puede ser nulo.', () => {
            expect(attributes.area.type instanceof DataTypes.INTEGER).toBe(true);
            expect(attributes.area.allowNull).toBe(false);
        });

        it('population: Un número entero que representa la población del pais, no puede ser nulo.', () => {
            expect(attributes.population.type instanceof DataTypes.INTEGER).toBe(true);
            expect(attributes.population.allowNull).toBe(false);
        });
    });
});

