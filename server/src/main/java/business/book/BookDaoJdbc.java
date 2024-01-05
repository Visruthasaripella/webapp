package business.book;
import business.JdbcUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import business.BookstoreDbException.BookstoreQueryDbException;

public class BookDaoJdbc implements BookDao {

    private static final String FIND_BY_BOOK_ID_SQL =
            "SELECT book_id, title, author,description, price,rating, is_public,is_featured, category_id " +
                    "FROM book " +
                    "WHERE book_id = ?";

    private static final String FIND_BY_CATEGORY_ID_SQL =
            "SELECT book_id, title, author,description, price,rating, is_public,is_featured, category_id " +
                    "FROM book " +
                    "WHERE category_id = ?";
    // TODO Implement this constant to be used in the findByCategoryId method
    private static final String FIND_BY_CATEGORY_NAME_SQL =
            "SELECT book_id, title, author,description, price,rating, is_public,is_featured, book.category_id " +
                    "FROM book join category on  category.category_id = book.category_id  " +
                    "WHERE name = ?";
    private static final String FIND_RANDOM_BY_CATEGORY_ID_SQL =
            "SELECT book_id, title, author,description, price,rating, is_public,is_featured, category_id " +
                    "FROM book " +
                    "WHERE category_id = ? " +
                    "ORDER BY RAND() " +
                    "LIMIT ?";
    private static final String FIND_RANDOM_BY_CATEGORY_NAME_SQL =
            "SELECT book_id, title, author,description, price,rating, is_public,is_featured, book.category_id " +
                    "FROM book join category on  category.category_id = book.category_id " +
                    "WHERE category.name = ? " +
                    "ORDER BY RAND() " +
                    "LIMIT ?";
    private static final String FIND_TOP_RATED_BOOKS_SQL =
            "SELECT book_id, title, author,description, price,rating, is_public,is_featured, category_id " +
                    "FROM book " +
                    "ORDER BY rating DESC " +
                    "LIMIT ?";
    @Override
    public Book findByBookId(long bookId) {
        Book book = null;
        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_BY_BOOK_ID_SQL)) {
            statement.setLong(1, bookId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    book = readBook(resultSet);
                }
            }
        } catch (SQLException e) {
            throw new BookstoreQueryDbException("Encountered a problem finding book " + bookId, e);
        }
        return book;
    }

    @Override
    public List<Book> findByCategoryId(long categoryId) {
        List<Book> books = new ArrayList<>();
        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_BY_CATEGORY_ID_SQL)) {
            statement.setLong(1, categoryId);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    books.add(readBook(resultSet));
                }
            }
        } catch (SQLException e) {
            throw new BookstoreQueryDbException("Encountered a problem finding book " + categoryId, e);
        }
        return books;

        // TODO: Implement this method.
    }

    @Override
    public List<Book> findByCategoryName(String categoryName){
        List<Book> books = new ArrayList<>();
        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_BY_CATEGORY_NAME_SQL)) {
            statement.setString(1, categoryName);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    books.add(readBook(resultSet));
                }
            }
        } catch (SQLException e) {
            throw new BookstoreQueryDbException("Encountered a problem finding book " + categoryName, e);
        }
        return books;
    }
    @Override
    public List<Book> findRandomByCategoryId(long categoryId, int limit) {
        List<Book> books = new ArrayList<>();
        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_RANDOM_BY_CATEGORY_ID_SQL)) {
            statement.setLong(1, categoryId);
            statement.setInt(2,limit);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    books.add(readBook(resultSet));
                }
            }
        } catch (SQLException e) {
            throw new BookstoreQueryDbException("Encountered a problem finding book " + categoryId, e);
        }
        return books;
    }

    @Override
    public List<Book> findRandomBooksByCategoryName(String categoryName, int limit) {
        List<Book> books = new ArrayList<>();
        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_RANDOM_BY_CATEGORY_NAME_SQL)) {
            statement.setString(1, categoryName);
            statement.setInt(2,limit);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    books.add(readBook(resultSet));
                }
            }
        } catch (SQLException e) {
            throw new BookstoreQueryDbException("Encountered a problem finding book " + categoryName, e);
        }
        return books;
    }

    @Override
    public List<Book> getTopRatedBooks(int limit){
        List<Book> books = new ArrayList<>();
        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_TOP_RATED_BOOKS_SQL)) {
            statement.setLong(1, limit);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    books.add(readBook(resultSet));
                }
            }
        } catch (SQLException e) {
            throw new BookstoreQueryDbException("Encountered a problem finding top rated books", e);
        }

        return books;
    }
    private Book readBook(ResultSet resultSet) throws SQLException {
        // TODO add description, isFeatured, rating to Book results
        String descripition = resultSet.getString("description");
        long bookId = resultSet.getLong("book_id");
        String title = resultSet.getString("title");
        String author = resultSet.getString("author");
        int price = resultSet.getInt("price");
        boolean isFeatured = resultSet.getBoolean("is_featured");
        boolean isPublic = resultSet.getBoolean("is_public");
        long categoryId = resultSet.getLong("category_id");
        long rating = resultSet.getLong("rating");
        return new Book(bookId, title, author, price,descripition,rating, isFeatured,isPublic, categoryId);
    }
}
