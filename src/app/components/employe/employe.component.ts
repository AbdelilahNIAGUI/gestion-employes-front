import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmployeService } from 'src/app/services/employe.service';
import Swal from 'sweetalert2';

interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'France',
    flag: 'c/c3/Flag_of_France.svg',
    area: 640679,
    population: 64979548
  },
  {
    name: 'Germany',
    flag: 'b/ba/Flag_of_Germany.svg',
    area: 357114,
    population: 82114224
  },
  {
    name: 'Portugal',
    flag: '5/5c/Flag_of_Portugal.svg',
    area: 92090,
    population: 10329506
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'Vietnam',
    flag: '2/21/Flag_of_Vietnam.svg',
    area: 331212,
    population: 95540800
  },
  {
    name: 'Brazil',
    flag: '0/05/Flag_of_Brazil.svg',
    area: 8515767,
    population: 209288278
  },
  {
    name: 'Mexico',
    flag: 'f/fc/Flag_of_Mexico.svg',
    area: 1964375,
    population: 129163276
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'India',
    flag: '4/41/Flag_of_India.svg',
    area: 3287263,
    population: 1324171354
  },
  {
    name: 'Indonesia',
    flag: '9/9f/Flag_of_Indonesia.svg',
    area: 1910931,
    population: 263991379
  },
  {
    name: 'Tuvalu',
    flag: '3/38/Flag_of_Tuvalu.svg',
    area: 26,
    population: 11097
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeComponent implements OnInit {

  page = 1;
  pageSize = 4;
  collectionSize = COUNTRIES.length;
  countries: Country[];
  employes;

  // -------
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  displayedColumns: string[] = ['action', 'id', 'nom', 'prenom', 'numPoste', 'departement'];
  data;
  dataSource;

  constructor(
    private employeService: EmployeService
  ) {
    // this.refreshEmployes();
  }

  ngOnInit() {
    this.getAllData();
  }

  // refreshEmployes() {
  //   this.employes = this.data
  //     .map((employe, i) => ({id: i + 1, ...employe}))
  //     .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  // }

  async getAllData() {
    this.data = await this.employeService.getAllData()
    .subscribe(
      res => {
        this.data = res,
        // this.employes = this.data,
        this.dataSource = new MatTableDataSource(this.data),
        this.dataSource.paginator = this.paginator,
        this.dataSource.sort = this.sort,
        console.log('data : ', this.data);
      }
    );
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // Ajouter un employe
  async addEmploye() {
    const body = {
      nom: '',
      prenom: '',
      numPoste: '',
      departement: ''
    };

    const { value: nom } = await Swal.fire({
      title: 'Entrer le nom de l\'employé',
      input: 'text',
      inputPlaceholder: 'Nom',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Vous devez insérer un nom!';
        }
      }
    });
    if (nom) {
      body.nom = nom;
    }
    const { value: prenom } = await Swal.fire({
      title: 'Entrer le prénom de l\'employé',
      input: 'text',
      inputPlaceholder: 'Prénom',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Vous devez insérer un prénom!';
        }
      }
    });
    if (prenom) {
      body.prenom = prenom;
    }
    const { value: numPoste } = await Swal.fire({
      title: 'Entrer le numéro de poste de l\'employé',
      input: 'number',
      inputPlaceholder: 'Numéro de poste',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Vous devez insérer un numéro de poste!';
        }
      }
    });
    if (numPoste) {
      body.numPoste = numPoste;
    }
    const { value: departement } = await Swal.fire({
      title: 'Entrer le département de l\'employé',
      input: 'text',
      inputPlaceholder: 'Département',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Vous devez insérer un département!';
        }
      }
    });
    if (departement) {
      body.departement = departement;
    }
    if ( body.nom !== '' || body.prenom !== '' || body.numPoste !== '' || body.departement !== '') {
      this.employeService.addEmploye(body)
      .subscribe(
        value => {
          this.getAllData();
        }
      );
    }
  }

   // Supprimer un employe par son ID
   delEmploye(id) {
      Swal.fire({
      title: 'Etes-vous sûr vouloir supprimer cet employé?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        this.employeService.delEmploye(id)
          .subscribe(
            value => {
              this.getAllData();
            }
          ),
        Swal.fire(
          'Terminé',
          'Cet emplyé a bien été supprimé.',
          'success'
        );
      }
    });
  }

  // Modifier un employe
async editEmploye(id1, nom1, prenom1, numPoste1, departement1) {
  const cancelBut = false;
  const body = {
    id: id1,
    nom: '',
    prenom: '',
    numPoste: 0,
    departement: ''
  };
  const { value: nom } = await Swal.fire({
    title: 'Modifier le nom de l\'employé',
    input: 'text',
    inputValue: nom1,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Ce champ ne doit pas être vide!';
      }
    }
  });
  if (nom) {
    body.nom = nom;
  } else {
    body.nom = nom1;
  }
  const { value: prenom } = await Swal.fire({
    title: 'Modifier le prénom de l\'employe',
    input: 'text',
    inputValue: prenom1,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Ce champ ne doit pas être vide!';
      }
    }
  });
  if (prenom) {
    body.prenom = prenom;
  } else {
    body.prenom = prenom1;
  }
  const { value: numPoste } = await Swal.fire({
    title: 'Modifier le numéro de poste de l\'employe',
    input: 'number',
    inputValue: numPoste1,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Ce champ ne doit pas être vide!';
      }
    }
  });
  if (numPoste) {
    body.numPoste = numPoste;
  } else {
    body.numPoste = numPoste1;
  }
  const { value: departement } = await Swal.fire({
    title: 'Modifier le département de l\'employe',
    input: 'text',
    inputValue: departement1,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Ce champ ne doit pas être vide!';
      }
    }
  });
  if (departement) {
    body.departement = departement;
  } else {
    body.departement = departement1;
  }
  this.employeService.editEmploye(body)
  .subscribe(
    value => {
      this.getAllData();
    }
  );
}

}
