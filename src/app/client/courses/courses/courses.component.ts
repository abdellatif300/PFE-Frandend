import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
// ... (your imports)

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: [
    './courses.component.css',
    './../../../../assets/css/bootstrap.min.css',
    './../../../../assets/css/animate.css',
    './../../../../assets/css/owl.carousel.min.css',
    './../../../../assets/css/themify-icons.css',
    './../../../../assets/css/flaticon.css',
    './../../../../assets/css/magnific-popup.css',
    './../../../../assets/css/slick.css',
    './../../../../assets/css/style.css',
  ],
})
export class CoursesComponent implements OnInit {
  constructor(private service: CourseService) {}

  courses?: Course[];
  filteredCourses?: any[];
  comapnyCourses?: any[];
  participantCourses?: any[];
  categories: any[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';

  // Filters
  searchQuery: string = '';
  selectedCategories: Set<string> = new Set();
  maxPrice: number = 0;
  priceRange!: { min: number; max: number };
  selectedTypes: Set<string> = new Set();

  async ngOnInit() {
    await this.getCourses();
    this.extractCategories();
    this.applyFilters(); // Apply filters when courses are fetched
  }

  async getCourses() {
    try {
      this.courses = await this.service.getCourses().toPromise();
      this.courses = this.courses?.filter(crs => crs.type === "PARTICIPANT")
      console.log(this.courses);

      if (this.courses && this.courses.length > 0) {
        this.maxPrice = Math.max(...this.courses.map((course) => course.cost));
        this.priceRange = { min: 0, max: this.maxPrice };

        this.comapnyCourses = this.courses?.filter(
          (course) => course.type === 'COMPANY'
        );
        this.participantCourses = this.courses?.filter(
          (course) => course.type === 'PARTICIPNT'
        );

        this.filteredCourses = this.courses;
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  extractCategories() {
    const uniqueCategories = Array.from(
      new Set(this.courses?.map((course) => course.category))
    );
    this.categories = uniqueCategories.map((category) => ({
      id: category,
      categoryName: category,
    }));
  }

  filterByCategory(category: string) {
    if (category === 'All') {
      this.selectedCategories.clear(); // Clear selected categories if 'All' is selected
    } else {
      this.selectedCategories.has(category)
        ? this.selectedCategories.delete(category)
        : this.selectedCategories.add(category);
    }
    this.applyFilters();
  }

  filterByType(type: string) {
    if (type === 'COMPANY' || type === 'PARTICIPANT') {
      this.selectedTypes.has(type)
        ? this.selectedTypes.delete(type)
        : this.selectedTypes.add(type);
      this.applyFilters();
    }
  }

  sortByPrice() {
    this.filteredCourses?.sort((a, b) => {
      const priceA = a.cost;
      const priceB = b.cost;
      return this.sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }

  getFilteredCourseCount(categoryId: string): number {
    return (this.courses ?? []).filter(
      (course) => course.category === categoryId
    ).length;
  }

  applyFilters() {
    if (
      this.selectedTypes.has('companies') &&
      !this.selectedTypes.has('online')
    ) {
      this.filteredCourses = this.comapnyCourses;
    } else if (
      !this.selectedTypes.has('companies') &&
      this.selectedTypes.has('online')
    ) {
      this.filteredCourses = this.participantCourses;
    } else {
      this.filteredCourses = this.courses;
    }

    this.filteredCourses = this.courses?.filter((course) => {
      const isInCategories =
        this.selectedCategories.size === 0 ||
        this.selectedCategories.has(course.category);
      const isInRange =
        course.cost >= this.priceRange.min &&
        course.cost <= this.priceRange.max;
      const isInTypes =
        this.selectedTypes.size === 0 || this.selectedTypes.has(course.type);
      const matchesSearch = course.title
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());

      return isInCategories && isInRange && isInTypes && matchesSearch;
    });

    this.sortByPrice(); // Apply sorting after applying filters
  }

  clearAllFilters() {
    this.searchQuery = '';
    this.selectedCategories.clear();
    this.priceRange = { min: 0, max: this.maxPrice };
    this.selectedTypes.clear();
    this.applyFilters();
  }


  getStarArray(score: number): number[] {
    return Array.from({ length: 5 }, (_, index) => index + 1 <= score ? 1 : 0);
  }



  getStarRatingHtml(averageRating: number): string {
    const roundedRating = Math.round(averageRating);

    // Create HTML for star rating
    const starHtml = Array.from({ length: 5 }, (_, index) =>
      index < roundedRating
        ? '<a href="#"><img src="../../assets/img/icon/color_star.svg" alt=""></a>'
        : '<a href="#"><img src="../../assets/img/icon/star.svg" alt=""></a>'
    ).join('');

    return starHtml;
  }


  getAverageRating(feedbacks: any[]): number {
    if (!feedbacks || feedbacks.length === 0) {
      return 0;
    }

    const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.score, 0);
    const averageRating = totalRating / feedbacks.length;

    // Round to one decimal place
    return Math.round(averageRating * 10) / 10;
  }


}
