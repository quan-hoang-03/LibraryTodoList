import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {
  // studentForm!: FormGroup;
  userForm: FormGroup | undefined;
  studentArr: any[] = [];
  page: number = 1;
  pageSize: number = 2;
  searchText: any;
  currentPageData: any;
  student: any = {
    iD: '',
    fullName: '',
    class: '',
    email: '',
    address: '',
  };

  isSelectedAll: boolean = false;
  showCheckbox: any;
  studentData: any;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    //lưu trữ dữ liệu vào localData
    //Chỉ truy cập localStorage trên phía client
    if (typeof window !== 'undefined' && window.localStorage) {
      const localData = localStorage.getItem('studentList');
      if (localData != null) {
        this.studentArr = JSON.parse(localData);
      }
    }
    this.onPageData();
  }

  onAddStudent() {
    const notNull = document.getElementById('studentModal');
    if (notNull != null) {
      notNull.style.display = 'flex';
      notNull.style.alignItems = 'center';
    }
    //khởi tạo lại đối tượng khi click vào add 1 lần nữa
    this.student = {
      iD: 0,
      fullName: '',
      class: '',
      email: '',
      address: '',
    };
  }
  onCloseModal() {
    const notNull = document.getElementById('studentModal');
    if (notNull != null) {
      notNull.style.display = 'none';
    }
  }
  onEdit(stud: any, id: number) {
    this.onAddStudent();
    this.student.iD = id;
    this.student.fullName = stud.fullName;
    this.student.class = stud.class;
    this.student.email = stud.email;
    this.student.address = stud.address;
    console.log(this.student);
  }
  onSave(data: any) {
    let newId = 1;
    if(this.studentArr.length > 0){
      newId = Math.max(...this.studentArr.map(student => student.iD)) + 1;
      console.log("new id :",newId)
    }
    this.student.iD = newId;
    this.studentArr.push(this.student);
    this.onCloseModal();
    localStorage.setItem('studentList', JSON.stringify(this.studentArr));
    //khi save xog nó sẽ trả về các ô input rỗng
    this.student = {
      iD: 0,
      fullName: '',
      class: '',
      email: '',
      address: '',
    };
    console.log(this.studentArr);
    this.onPageData()
  }
  onUpdate() {
    const givingToLocal = this.studentArr.find((m) => m.iD == this.student.iD);
    givingToLocal.fullName = this.student.fullName;
    givingToLocal.class = this.student.class;
    givingToLocal.email = this.student.email;
    givingToLocal.address = this.student.address;
    localStorage.setItem('studentList', JSON.stringify(this.studentArr));
    this.onCloseModal();
  }
  onCancel() {
    // Hủy các thay đổi đã thực hiện
    this.student = JSON.parse(JSON.stringify(this.studentArr));
    this.onCloseModal();
  }
  onDelete(id: number) {
    const result = confirm('Bạn có muốn xóa sinh viên này không');
    if (result) {
      for (let i = 0; i < this.studentArr.length; i++) {
        if (this.studentArr[i].iD == id) {
          this.studentArr.splice(i, 1);
        }
      }
      localStorage.setItem('studentList', JSON.stringify(this.studentArr));
    }
  }

  onPageData() {
    const itemsPerPage = 2; // Maximum items per page
    let currentPageData = this.studentArr.slice(
      (this.page - 1) * itemsPerPage,
      Math.min(this.page * itemsPerPage,this.studentArr.length)
    );
    console.log("current",currentPageData)
    const maxPage = Math.ceil(this.studentArr.length / itemsPerPage);
    console.log("page",maxPage);
    if (currentPageData.length === 0) {
      console.log("length current",currentPageData.length)
      this.page = Math.max(1, Math.min(this.page, maxPage));
      currentPageData = this.studentArr.slice(
        (this.page - 1) * itemsPerPage,
        Math.min(this.page * itemsPerPage, this.studentArr.length)
      );
    }

    // const studentData = this.studentArr
    // console.log("new data",studentData);
    // if(studentData[studentData.length - 1] % 2 ===0){
    //   console.log(studentData[studentData.length-1])
    // }
    // console.log(studentData)

    // const startIndex = (this.page - 1) * 2;
    // const endIndex = Math.min(startIndex + 2, this.studentArr.length);
    // const visibleItemsCount = endIndex - startIndex + 1;
    // if (visibleItemsCount) {
    //   this.page -= 1;
    // }
    // console.log("start :",startIndex)
    // console.log("end length:",endIndex)
    // console.log("current length :",this.studentArr.length)


    for (let i = 0; i < this.studentArr.length; i++) {
      this.studentArr[i].isChecked = this.isSelectedAll;
    }
  }
  // onCheckAll() {
  //   for (let i = 0; i < this.studentArr.length; i++) {
  //     this.studentArr[i].isChecked = this.isSelectedAll;
  //   }
  // }

  onDeleteAllStudent() {
    const result = confirm('Bạn có muốn xóa hết không ?');
    if (result) {
      for (let i = this.studentArr.length - 1; i >= 0; i--) {
        if (this.studentArr[i].isChecked) {
          this.studentArr.splice(i, 1);
        }
      }
      this.isSelectedAll = false;
      localStorage.setItem('studentList', JSON.stringify(this.studentArr));
    }
    this.onPageData();
  }

  onSubmit(form: NgForm): void {
    console.log(form);
  }
  // onSearch(){
  //   const isData = localStorage.getItem('studentList');
  //   if(isData!=null){
  //     const localData = JSON.parse(isData);
  //     // Tìm kiếm theo fullName (không phân biệt hoa thường)
  //     if(this.searchText){
  //       const filteredData = localData.filter((m: any) =>
  //         m.fullName.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())
  //       );
  //       console.log("search",filteredData)
  //       this.studentArr = filteredData;
  //     }else{
  //      // Nếu searchText rỗng, hiển thị tất cả học sinh
  //     this.studentArr = localData;
  //     }
  //   }
  // }

  // onSearch() {
  //   const isData = localStorage.getItem('studentList');

  //   if (isData !== null) {
  //     const localData = JSON.parse(isData);

  //     // Hàm chuẩn hóa văn bản để tìm kiếm không phân biệt hoa thường và không dấu
  //     const normalizeText = (text: string) =>
  //       text
  //         .toLocaleLowerCase() // Chuyển sang chữ thường
  //         .normalize('NFD') // Chuẩn hóa với Normalization Form D (NFD) để loại bỏ dấu
  //         .replace(/[\u0300-\u036F]/g, ''); // Xóa dấu gộp

  //     // Lógica tìm kiếm sử dụng searchText và fullNames đã được chuẩn hóa
  //     const filteredData = localData.filter((m: any) => {
  //       //Gọi hàm normalizeText truyền vào this.searchText
  //       //Biến normalizedSearchText lưu trữ nội dung tìm kiếm đã được chuẩn hóa (chuyển sang chữ thường và loại bỏ dấu).
  //       const normalizedSearchText = normalizeText(this.searchText);
  //       const normalizedFullName = normalizeText(m.fullName);
  //       //Sử dụng phương thức includes để kiểm tra xem normalizedFullName (tên học sinh đã chuẩn hóa)
  //       //có chứa normalizedSearchText (nội dung tìm kiếm đã chuẩn hóa) hay không.
  //       //Kết quả trả về của includes (true/false) sẽ quyết định học sinh đó có được đưa vào danh sách lọc (filteredData) hay không
  //       return normalizedFullName.includes(normalizedSearchText);
  //     });

  //     console.log("search", filteredData);
  //     this.studentArr = filteredData;
  //   }
  // }
  // usernamePattern = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúý ]+$/i;

  namePattern =
    '^[a-zA-Zsàáạảãâầấậẩẫăèéẹẻẽêềếệểễìíịỉĩôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]+$/i';
  classPattern = '^[a-zA-Z0-9]+$';
  gmailPattern =
    /^\s*[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
}
// export function gmailValidator(
//   control: AbstractControl
// ): { [key: string]: boolean } | null {
//   const email = control.value;
//   if (!email) {
//     return null;
//   }
//   const domain = email.split('@').pop();
//   if (domain !== 'gmail.com') {
//     return { gmailDomain: true };
//   }
//   return null;
// }
export interface Student{
  iD: number,
  fullName: string,
  class: any,
  email: any,
  address: any,
}
