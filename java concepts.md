####Singleton vs. Static Class
|                                 |      Singleton     |         Static Class         |
|---------------------------------|:------------------:|:----------------------------:|
| Call Binding                    |       Runtime      |         Compile time         |
| Loading                         |       Lazily       |            Eagerly           |
| Overridable                     |         Yes        |              No              |
| Easily swappable implementation |         Yes        |              No              |
| *Good for maintaining state     |         Yes        |              No              |
| *Testing                        |    Easy to mock    |          Not so easy         |
| Recommended use                 | Full OO capability | Collection of static methods |

Note that here, static class means a class with only static methods, as opposed to an actual static class which necessitates being a nested class.